import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UseUserAuth';

const Prevent = ({children}) => {
    var navigate = useNavigate();
    var {isLoggedIn, loading} = useUserAuth();
  
    useEffect(() => {
        if(!isLoggedIn && !loading){
            setTimeout(() => {
                navigate('/dashboard');
              }, 1000);
        }
    }, [isLoggedIn, loading]);

    return (
    <>
      {children}
    </>
  )
}

export default Prevent
