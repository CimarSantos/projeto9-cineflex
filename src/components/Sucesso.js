import { Link } from "react-router-dom";
import styled from "styled-components";

const Boxtitle = styled.div`
  background-color: #e5e5e5;
  height: 110px;
  padding-top: 20px;

  h2 {
    font-size: 24px;
    font-family: "Roboto";
    color: #247a6b;
    padding: 30px 50px;
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
    font-size: 24px;
    color: #293845;
    font-weight: 700;
    font-family: "Roboto";
    margin-bottom: 15px;
  }

  p {
    font-size: 22px;
    font-family: "Roboto";
    margin-bottom: 10px;
  }

  button {
    width: 225px;
    height: 43px;
    background-color: #e8833a;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-size: 18px;
    margin: 25px 10px 0 0;
  }
`;

export default function Sucesso({ pedido }) {
  return (
    <>
      <Container>
        <Boxtitle className="bold">
          <h2>Pedido feito com sucesso! </h2>
        </Boxtitle>
      </Container>
      <Container>
        <Section>
          <h3>Filme e sessão</h3>
          <p>{pedido.filme}</p>
          <p>
            {pedido.data} {pedido.horario}
          </p>
        </Section>
        <Section>
          <h3>Ingressos</h3>
          <span>
            {pedido.assentos.map((assento) => (
              <span className="centralizado flexD">Assento {assento}</span>
            ))}
          </span>
        </Section>
        <Section>
          <h3>Comprador</h3>
          <p>Nome: {pedido.nome}</p>
          <p>CPF: {pedido.cpf}</p>
        </Section>
        <Section>
          <Link to="/">
            <button>Voltar para Home</button>
          </Link>
        </Section>
      </Container>
    </>
  );
}
