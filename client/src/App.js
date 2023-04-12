import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { useState } from 'react';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  return (
    <div className="App">
      <Router>
        <Routes>
          {
            token ? <Route path='/' exact element={<Home token={token} />} /> : <Route path='/' exact element={<Login setToken={setToken} />} />
          }
          <Route path='/signup' exact element={<SignUp setToken={setToken} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
