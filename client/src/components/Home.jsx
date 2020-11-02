import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import UserContext from './Context/UserContext';
import axios from 'axios';
import { get } from 'mongoose';

export default function Home() {
  const {
    message,
    setMessage,
    login,
    setLogin,
    userData,
  } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});

  const userId = userData.user;
  useEffect(() => {
    axios
      .get(`/users/${userId}`, {
        headers: {
          'x-auth-token': userData.token,
        },
      })
      .then((user) => {
        setUserInfo(user.data);
        setLogin(true);
      });
  }, []);

  const getUserInfo = () => {
    return (
      <>
        <p>Username : {userInfo.username}</p>
        <p>Email: {userInfo.email}</p>
      </>
    );
  };

  return (
    <div>
      <p style={{ color: 'green' }}>
        Welcome back {userInfo.username}{' '}
      </p>
      <div>{getUserInfo()}</div>
    </div>
  );
}
