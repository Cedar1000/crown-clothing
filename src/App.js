import React from 'react';
import './App.css';

import { Route, Routes } from 'react-router';

import Homepage from './pages/homepage/homepage.component';
import Shopage from './pages/shopage/shop.component';
import Header from './components/header/header.component.jsx';

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shopage />} />
      </Routes>
    </div>
  );
}

export default App;
