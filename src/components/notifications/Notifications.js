import React from 'react';
import {Snackbar, Alert, Slide} from '@mui/material';
import { useUserAuth } from '../../context/UseUserAuth';


function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

const Notifications = () => {


  const {message, openNotifi, notificationType, setOpenNotifi} = useUserAuth();

  const handleCloseNotifi = (event, reason) => {
    if(reason === "clickaway"){
      return;
    }
    setOpenNotifi(false);
  };

  return (
    <>
       <Snackbar
    anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
    open={openNotifi}
    onClose={handleCloseNotifi}
    TransitionComponent={TransitionRight}
    autoHideDuration={4000}
    >
       <Alert severity={notificationType} 
       sx={{
        width: '100%',
        fontSize:'1.3rem',
        fontFamily:'poppines'
        }}>
       {message}
       </Alert>
    </Snackbar>
    </>
  )
}

export default Notifications;
