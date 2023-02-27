import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import logstyle from './style.module.css';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UseUserAuth';

const Login = () => {

  const navigate = useNavigate();
  const {setIsLoggedIn, setLoading, url, setUser, setMessage, setNotificationType, setOpenNotifi, setImage} = useUserAuth();
  const [logging, setLogging] = useState(false);

  const loginHandle = (event) => {
    setMessage('Logging in...');
    setNotificationType('info');
    setOpenNotifi(true);
    setLogging(true);
    const data = {
      "username": event.target.username.value, 
      "password": event.target.password.value
    }
   
    axios.post(`${url}/users/login`, data)
    .then((res) => {
      // console.log(res.data);
      setOpenNotifi(false);
      if(!res.data.success){
        if(res.data.err === "Email not verified!"){
          setMessage("Email not verified!");
          setNotificationType('error');
          setOpenNotifi(true);
          setLogging(false);
          navigate(`/register/resend/${res.data.user.username}`);
        }else{
        setMessage(res.data.err?.message);
        setNotificationType('error');
        setOpenNotifi(true);
        setLogging(false);
        }
      }else{
        localStorage.clear();
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.user.username);
        localStorage.setItem('email', res.data.user.email);
        setImage(res.data.user.img);
        setUser(res.data.user);
        setIsLoggedIn(true);
        setLoading(false);
        setMessage(res.data.status);
        setNotificationType('success');
        setOpenNotifi(true);
        setLogging(false);
        setTimeout(() => {
          navigate('/');
        }, 100);
      }
    })
    .catch((err) => {
      // console.log(err);
      setLogging(false);
      setMessage(err.message);
      setNotificationType('error');
      setOpenNotifi(true);
    });
    // console.log(data);
    event.preventDefault();
  }

  return (
    <div className={logstyle.login}>
      <div className={logstyle.outerBox}>
      <form onSubmit={loginHandle} className={logstyle.formdiv}>
          <div className={logstyle.icon}>
             <LockOutlinedIcon
              sx={{
                fontSize:'2rem'
                }}
             />
          </div>
          <div className={logstyle.username}>
            <input
            name='username'
            type='text'
            placeholder='Username'
            required
            autoComplete="off"
            />
          </div>
          <div className={logstyle.pass}>
          <input
          name='password'
          type='password'
          placeholder='Password'
          required
          autoComplete="off"
          />
          </div>
          <div className={logstyle.remember}>
            <div>
            <input
            name='checkbox' 
            type='checkbox'
            />
            <span>Remember me</span>
            </div>
            <div className={logstyle.forget}>
            <span onClick={() => navigate('/login/forget')}>Forget Pass?</span>
            </div>
          </div>
          <div className={logstyle.button}>
            <button>
              {logging ? <CircularProgress 
            style={{
              width:'15px', 
              height:'15px', 
              color:'var(--text-black-white)',
              marginRight: '0.6rem'
              }}
              />: null}
              Log In
              </button>
          </div>
      </form>
      <div className={logstyle.line}/>
      <div className={logstyle.register}>
        <p>Don't have account?</p>
        <span onClick={() => navigate('/register')}>Register</span>
      </div>
      </div>
    </div>
  )
}

export default Login;
