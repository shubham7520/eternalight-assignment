import './App.css';
// import Login from './components/auth/Login';
// import SignUp from './components/auth/SignUp';
import Home from './components/Home/Home';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  // const user = localStorage.getItem('Toke');


  return (
    <div className="App">
      {/* <Router>
        <Routes>
          {
            user ? <Route path='/' exact element={<Home />} /> : <Route path='/' exact element={<Login />} />
          }
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<SignUp />} />

        </Routes>
      </Router> */}
      <Home />
    </div>
  );
}

export default App;
