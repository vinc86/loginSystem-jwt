import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserContext from './components/Context/UserContext';
import Home from './components/Home';
import Nav from './components/Nav/Nav';
import NotLoggedIn from './components/NotLoggedIn/NotLoggedIn';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('auth-token');
      const userId = localStorage.getItem('user');

      setUserData({ token: token, user: userId });
      if (token) setLogin(true);
    };
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider
        value={{
          userData,
          setUserData,
          login,
          setLogin,
          message,
          setMessage,
          error,
          setError,
        }}
      >
        <Switch>
          <div className="App">
            <Nav />
            <Route
              path="/"
              exact
              component={login ? Home : NotLoggedIn}
            />
            <Route path="/login" exact component={Login} />
            <Route
              path="/register"
              exact
              component={Register}
            />
          </div>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
