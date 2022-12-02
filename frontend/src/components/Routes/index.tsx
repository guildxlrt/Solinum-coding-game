import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/Main';
import Navbar from '../Navbar';

function index() {  
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Main />} />
        </Routes>
    </BrowserRouter>
  )
}

export default index