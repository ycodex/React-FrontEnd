
import './App.css';
import React, { Suspense, lazy } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Register from './components/Register';
import Tweet from './components/Tweet';
import Search from './components/Search';

function App() {
  return (

   

      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/search" element={<Search/>} />
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/tweet" element={<Tweet/>}/>
      </Routes>

   
  );
}

export default App;

