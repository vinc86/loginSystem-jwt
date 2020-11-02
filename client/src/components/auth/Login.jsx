import axios from 'axios';
import { set } from 'mongoose';
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import UserContext from '../Context/UserContext';

export default function Login() {
  const {
    userData,
    setUserData,
    setLogin,
    login,
    error,
    message,
    setError,
  } = useContext(UserContext);
  const history = useHistory();
  const [credentials, setCredentials] = useState([]);

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const submitLogin = async (e) => {
    e.preventDefault();

    axios
      .post('/users/login', credentials)
      .then((res) => {
        localStorage.setItem('auth-token', res.data.token);
        localStorage.setItem('user', res.data.user.id);
        setError();
        setLogin(true);
        setUserData({
          token: res.data.token,
          user: res.data.user.id,
        });
        history.push('/');
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  return (
    <>
      <div className="login-container">
        <h2>LOGIN</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && (
          <p style={{ color: 'green' }}>
            {message} Proceed to login!
          </p>
        )}

        <form onSubmit={(e) => submitLogin(e)}>
          <input
            onChange={onChange}
            type="text"
            name="userNameOrEmail"
            placeholder="Username or Email"
          />
          <input
            onChange={onChange}
            type="password"
            name="password"
            placeholder="password"
          />
          <button className="action-btn">Login</button>
          <p>
            Not registered?{' '}
            <button
              onClick={() => history.push('/register')}
              className="to-login-or-register"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </>
  );
}
