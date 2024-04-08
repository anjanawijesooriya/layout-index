import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Button } from "antd";

//common
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";

//routes
import PrivateRoute from "./routes/PrivateRoute";
import PageNotFound from "./routes/PageNotFound";

//components
import Login from "./components/Login/login";
import Register from "./components/Register/Register";
import Home from "./components/Home";
import AddLocations from "./components/AddLocations";
import LocationView from "./components/LocationView";
import MyProfile from "./components/MyProfile";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home/:username"
            element={
              <PrivateRoute>
                <NavBar />
                <Home />
                <Footer />
              </PrivateRoute>
            }
          />

          <Route 
            path="/add-location" 
            element={
              <PrivateRoute>
                <NavBar />
                <AddLocations />
                <Footer />
              </PrivateRoute>
            } 
          />

          <Route 
            path= "/location-view/:id"
            element={
              <PrivateRoute>
                <NavBar />
                <LocationView />
                <Footer />
              </PrivateRoute>
            }
          />

          <Route
            path="/home/:username/my-profile"
            element={
              <PrivateRoute>
                <NavBar />
                <MyProfile />
                <Footer />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
