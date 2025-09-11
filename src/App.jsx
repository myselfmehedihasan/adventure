import React from 'react';
import Navbar from './Components/Navbar';
import Register from './Pages/Register';
import { Outlet } from 'react-router';
import Banner from './Components/Banner';

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Hello this is APP</h1>
      <Banner></Banner>
      <Outlet></Outlet>
    </div>
  );
};

export default App;
