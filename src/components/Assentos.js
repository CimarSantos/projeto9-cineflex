import Horarios from "./Horarios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Boxtitle = styled.div`
  background-color: #e5e5e5;
  height: 110px;
  padding-top: 20px;

  h2 {
    font-size: 24px;
    font-family: "Roboto";
    color: #293845;
  }
`;

const Container = styled.div`
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-direction: column;
  flex-wrap: wrap;
  padding-bottom: 30px;
  padding-left: 40px;
`;

export default function Assentos() {
  const { idSessao } = useParams();
  const [assentos, setAssentos] = useState([]);

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );

    request
      .then((response) => {
        setAssentos(response.data.seats);
      })
      .catch("Aguarde, carregando...");
  }, []);

  return (
    <>
      <Container>
        <Boxtitle className="flex">
          <h2>Selecione o(os) assento(os)</h2>
        </Boxtitle>

        {assentos.map((assento, index) => (
          <Container key={index}>
            <div>{assento.seats.id}</div>
          </Container>
        ))}
      </Container>
    </>
  );
}
