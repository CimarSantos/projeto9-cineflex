import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../assets/styles/style.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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

const Section = styled.div`
  h3 {
    font-size: 20px;
  }

  button {
    width: 83px;
    height: 43px;
    background-color: #e8833a;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-size: 18px;
    margin: 25px 10px 0 0;
  }
`;

const Boxfooter = styled.div`
  background-color: #9eadba;
  width: 100%;
  height: 117px;
  box-shadow: 0 0 5px #000;
  display: fixed;
  bottom: 0;
  align-items: center;
`;

const Imagebox = styled.div`
  background-color: #fff;
  width: 64px;
  height: 89px;
  border-radius: 5px;
  margin: 0 14px;

  img {
    width: 49px;
    height: 72px;
  }
`;

const Titulo = styled.h2`
  font-family: "Roboto";
  font-size: 26px;
  color: #293845;
`;

export default function Horarios() {
  const { idFilme } = useParams();
  const [sessoes, setSessoes] = useState([]);
  const [imgFooter, setimgFooter] = useState([]);
  const [titleFooter, setitleFooter] = useState([]);

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
    );

    request
      .then((response) => {
        setSessoes(response.data.days);
        setimgFooter(response.data.posterURL);
        setitleFooter(response.data.title);
      })
      .catch("Aguarde, carregando...");
  }, []);

  return (
    <>
      <Container>
        <Boxtitle className="flex">
          <h2>Selecione o horário</h2>
        </Boxtitle>
        {sessoes.map((sessao, index) => (
          <Section key={index}>
            <h3>
              {sessao.weekday} - {sessao.date}
            </h3>
            <Link to={`/assentos/${sessao.id}`}>
              {sessao.showtimes.map((showtimes, index) => (
                <button key={index}>{showtimes.name}</button>
              ))}
            </Link>
          </Section>
        ))}
      </Container>
      <Boxfooter className="flex">
        <Imagebox className="flex">
          <img src={imgFooter}></img>
        </Imagebox>
        <Titulo>{titleFooter}</Titulo>
      </Boxfooter>
    </>
  );
}
