import { Routes, Route } from 'react-router-dom';
import React from 'react';
import MakeBookings from './components/MakeBookings';
import ViewBookings from './components/ViewBookings';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div>
      
      <Routes>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/>   
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/make-bookings" element={<MakeBookings />} />
        <Route path="/view-bookings" element={<ViewBookings />} />
      </Routes>
      </div>
   
  );
}

export default App;
