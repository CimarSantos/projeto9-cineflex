import React from "react";
import { useState } from "react";
import Topo from "./components/Topo.js";
import Init from "./components/Init.js";
import Horarios from "./components/Horarios.js";
import Assentos from "./components/Assentos.js";
import Sucesso from "./components/Sucesso.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/reset.css";
import "./assets/styles/style.css";

const App = () => {
  const [pedido, setPedido] = useState({});
  return (
    <>
      <BrowserRouter>
        <Topo />
        <Routes>
          <Route path="/" element={<Init />} />
          <Route path="/sessoes/:idFilme" element={<Horarios />} />
          <Route
            path="/assentos/:idSessao"
            element={<Assentos pedido={pedido} setPedido={setPedido} />}
          />
          <Route path="/sucesso" element={<Sucesso pedido={pedido} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
