import './App.css';
import React from 'react';
import Navigation from '../Navigation/Navigation.js';
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import 'antd/dist/antd.min.css';

const App = () => {

  return (
    <div>
      <Header />
      <Navigation/>
      <Footer />
    </div>
  );
};

export default App;
