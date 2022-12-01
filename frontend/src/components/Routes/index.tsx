import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/Main';
import MapVue from '../../pages/MapVue';
import Navbar from '../Navbar';

function index() {  
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/map" element={<MapVue />} />
        </Routes>
    </BrowserRouter>
  )
}

export default index