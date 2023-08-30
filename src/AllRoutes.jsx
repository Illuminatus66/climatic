import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Visitor from "./Pages/Visitor/Visitor"
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/Visitor" element= {<Visitor/>} />
    </Routes>
    
  );
};

export default AllRoutes;
