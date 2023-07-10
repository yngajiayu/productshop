import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Admin from "./pages/admin";

function App() {
  return (
    <Routes>
      <Route path="admin" element={<Admin />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
