import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
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

export default function Sucesso({
  reserves,
  name,
  cpf,
  finalId,
  setReserves,
  setCpf,
  setName,
}) {
  const [seat, setSeat] = useState({ name: "", movie: "", day: "" });

  useEffect(() => {
    let novaReserva = { ids: [], name: name, cpf: cpf };
    for (let i = 0; i < reserves.length; i++) {
      novaReserva.ids.push(reserves[i].id);
    }
    axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
      novaReserva
    );
    let promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${finalId}/seats`
    );
    promise.then((info) => setSeat(info.data));
  }, []);

  function novoCpf() {
    let aux = "";
    for (let i = 0; i < cpf.length - 2; i++) {
      if (i % 3 === 0 && i !== 0) {
        aux += `${cpf[i]}`;
      } else {
        aux += `.${cpf[i]}`;
      }
    }
    aux += "-" + cpf[cpf.length - 2] + cpf[cpf.length - 1];
    return aux;
  }

  let stringCPF = novoCpf();
  let navigate = useNavigate();

  function voltaInit() {
    setReserves([]);
    setName("");
    setCpf("");
    let path = `/`;
    navigate(path);
  }

  return (
    <>
      <Container>
        <Boxtitle className="flex">
          <h2>Pedido feito com Sucesso!</h2>
        </Boxtitle>
        <Section className="Sessao">
          <h3>Filme e sessão</h3>
          <h4>{seat.movie.title}</h4>
          <h4>
            {seat.day.date} {seat.name}
          </h4>
        </Section>
        <Section className="assento">
          <h3>Ingressos</h3>
          {reserves.map((info, i) => (
            <h4 key={i}>Assento {info.seatNumber}</h4>
          ))}
        </Section>
        <Section className="comprador">
          <h3>Comprador</h3>
          <h4>Nome: {name}</h4>
          <h4>CPF: {stringCPF}</h4>
        </Section>
        <button className="reserva" onClick={voltaInit}>
          Voltar pra Home
        </button>
      </Container>
    </>
  );
}
