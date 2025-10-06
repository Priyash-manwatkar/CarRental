import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import MyBookings from './pages/MyBookings';
import Layout from './pages/pages/Layout';
import Dashboard from './pages/pages/Dashboard';
import Addcar from './pages/pages/Addcar';
import Managecars from './pages/pages/Managecars';
import ManageBookinhs from './pages/pages/ManageBookinhs';
import Login from './components/Login';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext';

function App() {

 const {showLogin}=useAppContext()
 const isOwnerPath=useLocation().pathname.startsWith('/owner')
  return (
    <>
    <Toaster />
   { showLogin && <Login/>}
   {!isOwnerPath &&<Navbar />}

   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/car-details/:id' element={<CarDetails/>}/>
     <Route path='/cars' element={<Cars/>}/>
      <Route path='/my-bookings' element={<MyBookings/>}/>
      <Route path='/owner' element={<Layout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path='add-car' element={<Addcar/>}/>
      <Route path='manage-cars' element={<Managecars/>}/>
      <Route path='manage-bookings' element={<ManageBookinhs/>}/>
      </Route>
  

   </Routes>
    </>
  )
}

export default App
