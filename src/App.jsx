import React from 'react';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router';
import Banner from './Components/Banner';
import Home from './Pages/Home';
import ScrollToTop from './Components/ScrollToTop';

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ScrollToTop></ScrollToTop>
      <Outlet></Outlet>
    </div>
  );
};

export default App;
