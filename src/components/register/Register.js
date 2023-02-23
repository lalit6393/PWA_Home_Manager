import React, {useState } from 'react';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import registerStyle from './style.module.css';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useUserAuth } from '../../context/UseUserAuth';

const Register = () => {

    const navigate = useNavigate();
    const {setUser, url, setMessage, setNotificationType, setOpenNotifi} = useUserAuth();
    const [registering, setRegistering] = useState(false);
    const [passMessage, setPassMessage] = useState('rgba(0, 0, 0, 0)');
    const [usernameMessage, setUsernameMessage] = useState('rgba(0, 0, 0, 0)');
    var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    

    const onfocus = (e) => {
      if(e.target.value?.match(passw)){
        setPassMessage('green');
      }else{
        setPassMessage('red');
      }
    }

    const onfocusout = (e) => {
       if(passMessage !== 'red' || e.target.value === '') setPassMessage('rgba(0, 0, 0, 0)');
    }

    const onfocusUser = (e) => {
      // console.log(e.target.value?.trim().length);
      if(e.target.value?.trim().length > 3 && e.target.value?.trim().length < 12 && e.target.value?.trim().length === e.target.value?.length){
        setUsernameMessage('green');
      }else{
        setUsernameMessage('red');
      }
    }

    const onfocusoutUser = (e) => {
       if(usernameMessage !== 'red' || e.target.value === '') setUsernameMessage('rgba(0, 0, 0, 0)');
    }

    const loginHandle = (event) => {
      event.preventDefault();
      setRegistering(true);
      setMessage('Registering...');
      setNotificationType('info');
      setOpenNotifi(true);
      const data = {
        "username": event.target.username.value, 
        "password": event.target.password.value,
        "email": event.target.email.value
      }
      var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

      if(data.password.match(passw)){
      axios.post(`${url}/users/signup`, data)
      .then((res) => {
        // console.log(res.data);
        setOpenNotifi(false);
        if(!res.data.success){
          setRegistering(false);
          setMessage(res.data.err?.message);
          setNotificationType('error');
          setOpenNotifi(true);
        }else{
          setUser(res.data.user);
          // console.log(res.data);
          if(localStorage.getItem('token')) localStorage.remove('token');
          if(localStorage.getItem('username'))localStorage.remove('username');
          localStorage.setItem('username', res.data.user.username);
          // template_3ga1czf
          emailjs.send('service_i3g1obg', 'template_3ga1czf', {name: res.data.user.username, email: res.data.user.email, appname: 'Home Manager', link:`${window.location.origin}/verification/${res.data.user.hash}`}, '5Ed-UnttEg7TCYwCB')
          .then((result) => {
              if(result.text === 'OK'){
                setRegistering(false);
                setMessage("Verification email send to your email.");
                setNotificationType('info');
                setOpenNotifi(true);
                navigate(`/register/resend/${res.data.user.username}`);
              }else{
                setRegistering(false);
                setMessage('Failed to send verification email!');
                setNotificationType('error');
                setOpenNotifi(true);
              }
          }, (error) => {
              // console.log(error.text);
              setRegistering(false);
              setMessage(error.text);
              setNotificationType('error');
              setOpenNotifi(true);
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        setRegistering(false);
        setMessage(err);
        setNotificationType('error');
        setOpenNotifi(true);
      });
    }
      // console.log(data);
    }
  
    return (
      <div className={registerStyle.login}>
        <div className={registerStyle.outerBox}>
        <form onSubmit={loginHandle} className={registerStyle.formdiv}>
            <div className={registerStyle.icon}>
               <HowToRegRoundedIcon
                sx={{
                  fontSize:'3rem'
                  }}
               />
            </div>
            <div className={registerStyle.username}>
              <input
              title='4 to 8 character long'
              onFocus={onfocusUser}
              onChange={onfocusUser}
              onBlur={onfocusoutUser}
              id='username'
              style={{
                border: `1.5px solid ${usernameMessage}`,
                boxSizing: 'border-box'
              }}
              name='username'
              type='text'
              placeholder='Username'
              required
              autoComplete="off"
              />
            </div>
            <div className={registerStyle.pass}>
            <input
            onFocus={onfocus}
            onChange={onfocus}
            onBlur={onfocusout}
            id='pass'
            style={{
              border: `1.5px solid ${passMessage}`,
              boxSizing: 'border-box'
            }}
            name='password'
            type='password'
            placeholder='Password'
            required
            autoComplete="off"
            />
            </div>
            <div style={{marginBottom: '0px'}} className={registerStyle.username}>
              <input
              style={{
                border: `1.5px solid rgb(0, 0, 0, 0)`,
                boxSizing: 'border-box'
              }}
              name='email'
              type='text'
              placeholder='Email'
              required
              autoComplete= 'off'
              />
            </div>
            <div className={registerStyle.button}>
              <button>
              {registering ? 
              <CircularProgress 
               style={{
              width:'15px', 
              height:'15px', 
              color:'var(--text-black-white)',
              marginRight: '0.6rem'
              }}
              />: null}
                Register
                </button>
            </div>
        </form>
        <div className={registerStyle.line}/>
        <div className={registerStyle.register}>
          <p>Already have an account?</p>
          <span onClick={() => navigate('/login')}>Log in</span>
        </div>
        </div>
        <div className={registerStyle.info}>
          <span>i</span>
          <p>Password must have 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.</p>
        </div>
      </div>
    )
}

export default Register;
