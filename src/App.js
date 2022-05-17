import React from "react";
import Topo from "./components/Topo.js";
import Init from "./components/Init.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/reset.css";
import "./assets/styles/style.css";

const App = () => {
  return (
    <BrowserRouter>
      <Topo />
      <Routes>
        <Route path="/" element={<Init />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
