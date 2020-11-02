import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../Context/UserContext';

export default function Buttons() {
  const {
    userData,
    setUserData,
    login,
    setLogin,
  } = useContext(UserContext);
  const history = useHistory();

  const register = () => history.push('/register');
  const loginUser = () => history.push('/login');
  const logout = () => {
    /*  localStorage.removeItem("auth-token")
        localStorage.removeItem("user") */
    localStorage.clear();

    setUserData({ token: undefined, user: undefined });
    setLogin(false);
  };
  return (
    <div className="menu-buttons">
      {!login ? (
        <>
          <button onClick={loginUser}>Login</button>
          <button onClick={register}>Register</button>
        </>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
}
