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

const Topo = () => {
  return (
    <>
      <Topobar className="flex">
        <Topotitle>CINEFLEX</Topotitle>
      </Topobar>
    </>
  );
};

export default Topo;
