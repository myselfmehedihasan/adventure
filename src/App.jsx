import React from 'react';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router';
import Banner from './Components/Banner';
import Home from './Pages/Home';

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      {/* <Home></Home> */}
    </div>
  );
};

export default App;
