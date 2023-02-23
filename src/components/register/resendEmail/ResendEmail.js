import React, { useEffect, useState } from 'react';
import resendStyle from './style.module.css';
import emailjs from '@emailjs/browser';
import { useUserAuth } from '../../../context/UseUserAuth';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResendEmail = () => {

    const params = useParams();
    const {url, setMessage, setNotificationType, setOpenNotifi} = useUserAuth();
    const [user, setUser] = useState(null);

    const resend = () => {
        if(user){
        emailjs.send('service_i3g1obg', 'template_3ga1czf', {name: user.username, email: user.email, appname:"Home Manager", link:`${window.location.origin}/verification/${user.hash}`}, '5Ed-UnttEg7TCYwCB')
        .then((result) => {
            if(result.text === 'OK'){
              setMessage("Verification email send to your email.");
              setNotificationType('info');
              setOpenNotifi(true);
            }else{
              setMessage('Failed to send verification email!');
              setNotificationType('error');
              setOpenNotifi(true);
            }
        }, (error) => {
            // console.log(error.text);
            setMessage(error.text);
            setNotificationType('error');
            setOpenNotifi(true);
        });
    }else{
        setMessage('Failed to send verification email!');
        setNotificationType('error');
        setOpenNotifi(true);
    }
    }

    useEffect(() => {
        if(!user){
            axios.get(`${url}/users/${params.username}`)
            .then((res) => {
                setUser(res.data.user);
                // console.log(res.data);
            })
            .catch((err) => {
                // console.log(err)
            });
        }
    },[]);

  return (
    <div className={resendStyle.home}>
      <p>Resend verification email to your registered email {user?.email}.</p>
      <p>In case you do not recieved email you can resend.</p>
      <button onClick={resend}>Resend</button>
    </div>
  )
}

export default ResendEmail;
