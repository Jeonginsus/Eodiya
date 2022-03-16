import React from 'react';
import Nav from './components/Nav';
import { Route, Routes} from 'react-router-dom';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
      <Nav />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/mypage" element={<Mypage />} />
          <Route exact path="/signin" element={<Signin />} />
        </Routes> 
    </div>
  );
};

export default App;
