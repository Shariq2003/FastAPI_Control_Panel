import React, { useState } from 'react';
import {Route, Routes, useActionData } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AdminPage from './pages/Admin/AdminPage';
import LoginPage from './pages/Login/LoginPage';
import './App.css'
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [is_admin, setIs_admin] = useState(localStorage.getItem("is_admin"));
  function loginHandler(){
    setIs_admin(localStorage.getItem("is_admin"));
  }
  return (
    <>
      <div className='container'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<HomePage />} />
          <Route path="/login" element={<LoginPage loginHandler={loginHandler}/>} />
          <Route path="/admin" element={
            <PrivateRoute is_admin={is_admin}>
              <AdminPage/>
            </PrivateRoute>
          } />
        <Route path="/*" element={<h3>Sorry this route is not defined yet</h3>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
