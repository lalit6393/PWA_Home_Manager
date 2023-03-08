import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import { UserAuthProvider } from './context/UseUserAuth';
import Login from './components/login/Login';
import Notifications from './components/notifications/Notifications';
import Register from './components/register/Register';
import ForgetPass from './components/login/forgetPass/ForgetPass';
import NewPass from "./components/login/newPass/NewPass";
import EmailVerify from "./components/verification/EmailVerify";
import ResendEmail from "./components/register/resendEmail/ResendEmail";
import Prevent from './components/Prevent';
import Landing from './components/landing/Landing';
import Group from './components/group/Group';
import PageNotFound from './components/page_not_found/PageNotFound';

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const switchTheme = () => {
    const newTheme = theme === 'dark' ? 'light':'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }

  return (
    <div className="App" data-theme = {theme}>
      <UserAuthProvider appTheme={theme}>
      <Notifications/>
      <Navbar switchTheme = {switchTheme}/>
      <Routes>
        <Route path="/" element={<Prevent><Home/></Prevent>}/>
        <Route path="/dashboard" element={<Landing/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="login/forget" element={<ForgetPass/>}/>
        <Route path="login/newPass/:token" element={<NewPass/>}/>
        <Route path="/verification/:uid" element={<EmailVerify/>}/> 
        <Route path="register/resend/:username" element={<ResendEmail/>}/>
        <Route path='/gp/:gpid' element={<Group/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      </UserAuthProvider>
    </div>
  );
}

export default App;
