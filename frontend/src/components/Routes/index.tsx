import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages';
import Navbar from '../Navbar';

function index() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default index