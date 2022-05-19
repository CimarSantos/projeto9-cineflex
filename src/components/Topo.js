import React from "react";
import styled from "styled-components";
import "../assets/styles/style.css";

const Topobar = styled.header`
  background-color: #c3cfd9;
  height: 67px;
`;

const Topotitle = styled.h1`
  font-size: 34px;
  font-family: "Roboto";
  color: #e8833a;
  text-shadow: 0 0 10px #a0833a;
`;

const Boxtitle = styled.div`
  background-color: #e5e5e5;
  height: 110px;

  h2 {
    font-size: 24px;
    font-family: "Roboto";
    color: #293845;
  }
`;

const Topo = () => {
  return (
    <>
      <Topobar className="flex">
        <Topotitle>CINEFLEX</Topotitle>
      </Topobar>
      <Boxtitle className="flex">
        <h2>Selecione o filme</h2>
      </Boxtitle>
    </>
  );
};

export default Topo;
