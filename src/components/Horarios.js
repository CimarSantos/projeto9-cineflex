import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../assets/styles/style.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Container = styled.div`
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  padding-bottom: 30px;
`;

export default function Horarios() {
  const { idFilme } = useParams();
  const [sessoes, setSessoes] = useState([]);

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
    );

    request
      .then((response) => {
        setSessoes(response.data.days);
        console.log(response);
      })
      .catch("Aguarde, carregando...");
  }, []);

  return (
    <Container>
      {sessoes.map((sessao, index) => (
        <h3 key={index}>
          {sessao.weekday} - {sessao.date}
          <Link to={`/assentos/${sessao.id}`}>
            <div>
              {sessao.showtimes.map((showtimes, index) => (
                <div key={index}>{showtimes.name}</div>
              ))}
            </div>
          </Link>
        </h3>
      ))}
    </Container>
  );
}
