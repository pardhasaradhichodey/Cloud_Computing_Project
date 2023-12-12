// App.js

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Carousel from "./Carousel";
import NavigationBar from "./NavigationBar";
import AuthPage from "./AuthPage";
import Dashboard from "./dashboard";
import Home from "./Home";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleLogin = (userData) => {
    setLoggedIn(true);
    setUserData(userData);
  };
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
          path="/login"
          element={loggedIn ? <Navigate to="/dashboard" /> : <AuthPage onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={loggedIn ? <Dashboard user={userData}/> : <Navigate to="/" />}
        />
    </Routes>
  );
};

export default App;
