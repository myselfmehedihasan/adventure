import React from 'react';
import Navbar from './Components/Navbar';
import Register from './Pages/Register';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Hello this is APP</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default App;
