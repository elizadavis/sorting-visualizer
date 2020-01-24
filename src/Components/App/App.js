import React from 'react';
import './App.scss';
import { Routes } from './Routes';
import { Header, Footer } from '../Main';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
