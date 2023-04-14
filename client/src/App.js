import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import './App.css';
import { useState } from 'react';

const App = () => {

  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setToken(localStorage.getItem("Token"));
    if (token) {
      const decodedJwt = JSON.parse(atob(token.split(".")[1]));
      if (decodedJwt.exp * 1000 > Date.now()) {
        setIsAuthenticated(true);
      }
      else {
        localStorage.clear("Token");
        setIsAuthenticated(false);
        window.location.reload();
      }
    }
  }, [token]);

  return (
    <div className="App">
      <Router>
        <Routes>
          {
            isAuthenticated ? <Route path='/' exact element={<Home token={token} />} /> : <Route path='/' exact element={<Login setToken={setToken} />} />
          }
          <Route path='/signup' exact element={<SignUp setToken={setToken} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
