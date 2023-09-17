import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Visitor from "./Pages/Visitor/Visitor";
import Map from "./Pages/Map/Map";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/Visitor" element= {<Visitor/>} />
      <Route path="/Map" element= {<Map/>} />
    </Routes>
    
  );
};

export default AllRoutes;
