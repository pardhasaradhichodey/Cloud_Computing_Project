// App.js

import React, { useState,useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./AuthPage";
import Dashboard from "./dashboard";
import Home from "./Home";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() =>{
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser((JSON.parse(storedUser)).userId);
      setLoggedIn(true);
    }
    else{
      setLoggedIn(false);
      setUser(null);
    }
    setLoading(false);
  },[]);
  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
          path="/login"
          element={loggedIn ? <Navigate to="/dashboard" /> : <AuthPage />}
        />
        <Route
          path="/dashboard"
          element={loggedIn ? <Dashboard user={user}/> : <Navigate to="/login" />}
        />
    </Routes>
  );
};

export default App;
