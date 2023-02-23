import { createContext, useState, useContext, useEffect } from "react";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [gas, setGas] = useState([]);
  const [water, setWater] = useState([]);
  const [message, setMessage] = useState(null);
  const [openNotifi, setOpenNotifi] = useState(false);
  const [notificationType, setNotificationType] = useState("info");
  const url = 'https://homemanager.onrender.com';
  // const url = "http://localhost:3000";

  //checking user in localstorage

  const localStore = () => {
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem("token")) {
        reject("user not found");
      }

      resolve({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
      });
    });
  };

  useEffect(() => {
    localStore()
      .then((userProfile) => {
        if (!userProfile.username) {
          setUser(null);
          setIsLoggedIn(false);
          setLoading(false);
        } else {
          // console.log(userProfile);
          setUser(userProfile);
          setIsLoggedIn(true);
          setLoading(false);
        }
      })
      .catch((e) => {
        setUser(null);
        setIsLoggedIn(false);
        setLoading(false);
        console.log(e);
      });
  }, []);



  return (
    <UserAuthContext.Provider
      value={{
        isVerified,
        isLoggedIn,
        loading,
        setIsVerified,
        setIsLoggedIn,
        setLoading,
        setToken,
        setUser,
        user,
        url,
        token,
        water,
        setWater,
        gas, 
        setGas,
        message,
        setMessage,
        openNotifi,
        setOpenNotifi,
        setNotificationType,
        notificationType
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
