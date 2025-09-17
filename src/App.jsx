import React from 'react';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router';
import Banner from './Components/Banner';
import Home from './Pages/Home';
import ScrollToTop from './Components/ScrollToTop';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ScrollToTop></ScrollToTop>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default App;
