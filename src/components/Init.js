import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../assets/styles/style.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Boxtitle = styled.div`
  background-color: #e5e5e5;
  height: 110px;
  padding: 20px 0;

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
  flex-wrap: wrap;
  padding-bottom: 30px;
`;

const Boxmovie = styled.div`
  width: 145px;
  height: 209px;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 0 10px #000;

  img {
    width: 129px;
    height: 193px;
  }
`;

const Init = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const requisitionMovie = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    requisitionMovie.then((response) => {
      setFilmes(response.data);
    });
  }, []);

  return (
    <>
      <Boxtitle className="flex">
        <h2>Selecione o filme</h2>
      </Boxtitle>
      <Container>
        {filmes.map((imagens, index) => (
          <Link to={`/Sessoes/${imagens.id}`}>
            <Boxmovie key={index} className="flex">
              <img src={imagens.posterURL} alt="filmes" />
            </Boxmovie>
          </Link>
        ))}
      </Container>
    </>
  );
};

export default Init;
