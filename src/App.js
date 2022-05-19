import React from "react";
import Topo from "./components/Topo.js";
import Init from "./components/Init.js";
import Horarios from "./components/Horarios.js";
import Assentos from "./components/Assentos.js";
import Sucesso from "./components/Sucesso.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/reset.css";
import "./assets/styles/style.css";

const App = () => {
  return (
    <BrowserRouter>
      <Topo />
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/sessoes/:idFilme" element={<Horarios />} />
        <Route path="/assentos/:idSessao" element={<Assentos />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
