import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
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
    margin-right: 50px;
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
  padding-left: 30px;
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

const Cadeiras = styled.div`
  gap: 10px;
  margin-right: 40px;
  padding: 0 10%;
`;

const Legenda = styled.div`
  justify-content: space-evenly;
  margin-right: 50px;

  div {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    font-size: 11px;
    font-family: "Roboto";
  }

  div .selecionado {
    background-color: #8dd7cf;
    border: 1px solid #1aae9e;
  }

  div .disponivel {
    background-color: #c3cfd9;
    border: 1px solid #7b8b99;
  }

  div .ocupado {
    background-color: #fbe192;
    border: 1px solid #f7c52b;
  }

  p {
    font-size: 13px;
    font-family: "Roboto";
    padding-top: 5px;
  }
`;

const Formulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin-bottom: 20px 0;
    display: flex;
  }

  label {
    font-family: "Roboto";
    font-size: 18px;
    color: #293845;
    padding: 10px;
    display: inline;
    margin-top: 10px;
  }

  input {
    width: 290px;
    height: 51px;
    border-radius: 3px;
    border: 1px solid #d5d5d5;
    font-size: 18px;
    font-family: "Roboto";
    padding: 0 20px;
  }

  button {
    width: 225px;
    height: 42px;
    background-color: #e8833a;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-size: 18px;
    margin-top: 30px;
  }
`;



export default function Assentos({
  reserves,
  setReserves,
  setFinalId,
  pedido,
  setPedido,
}) {
  const { idSessao } = useParams();
  const [seat, setSeat] = useState(null);
  const [imgFooter, setimgFooter] = useState([]);
  const [titleFooter, setitleFooter] = useState([]);
  const [diaFilme, setDiaFilme] = useState([]);
  const [horaFilme, setHoraFilme] = useState([]);
  const [assentoSelecionado, setAssentoSelecionado] = useState([]);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const navigate = useNavigate();

  function fazerPedido() {
    const objApi = {
      name: name,
      cpf: cpf,
    };
    setPedido({
      ...pedido,
      nome: name,
      cpf: cpf,
    });
    const request = axios.post(
      `https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`,
      objApi
    );
    request.then(navigate("/sucesso"));
  }

    useEffect(() => {
      const request = axios.get(
        `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
      );

      request
        .then((response) => {
          setSeat(response.data.seats);
          setimgFooter(response.data.movie.posterURL);
          setitleFooter(response.data.movie.title);
          setDiaFilme(response.data.day.weekday);
          setHoraFilme(response.data.name);
        })
        .catch("Aguarde, carregando...");
    }, [idSessao]);

    return (
      <>
        <Container>
          <Boxtitle className="flex">
            <h2>Selecione o(os) assento(os)</h2>
          </Boxtitle>
          {seat ? (
            <Cadeiras className="flex">
              {seat.map((assento, index) => (
                <Cadeira
                  number={assento.name}
                  id={assento.id}
                  isAvailable={assento.isAvailable}
                  assentoSelecionado={assentoSelecionado}
                  setAssentoSelecionado={setAssentoSelecionado}
                />
              ))}
            </Cadeiras>
          ) : (
            <p>Carregando</p>
          )}

          <Legenda className="flex">
            <div className="flex">
              <div className="selecionado"></div>
              <p>Selecionado</p>
            </div>
            <div className="flex disponivel">
              <div className="disponivel"></div>
              <p>Disponível</p>
            </div>
            <div className="flex indisponivel">
              <div className="ocupado"></div>
              <p>Indisponível</p>
            </div>
          </Legenda>
        </Container>
        <Container>
          <Formulario>
            <form className="userInfo" action="">
              <div>
                <label htmlFor="nome">Nome do comprador:</label>
              </div>
              <div>
                <input
                  id="nome"
                  className="reservationIn"
                  type="text"
                  placeholder="Qual seu nome?"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="cpf">CPF do comprador:</label>
              </div>
              <div>
                <input
                  id="cpf"
                  className="reservationIn"
                  type="number"
                  placeholder="Qual o número do seu CPF?"
                  value={cpf}
                  onChange={(event) => setCpf(event.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit" className="reserve" onClick={fazerPedido}>
                  <h3>Reservar assento(s)</h3>
                </button>
              </div>
            </form>
          </Formulario>
        </Container>
        <Boxfooter className="flex">
          <Imagebox className="flex">
            <img src={imgFooter} alt="posterMovie"></img>
          </Imagebox>
          <Titulo>
            {titleFooter}
            <p>
              {diaFilme} - {horaFilme}
            </p>
          </Titulo>
        </Boxfooter>
      </>
    );
}

function Cadeira({
  number,
  id,
  isAvailable,
  assentoSelecionado,
  setAssentoSelecionado,
}) {
  const [selected, setSelected] = useState(false);

  function select(isAvailable, id) {
    if (isAvailable) {
      setSelected(!selected);
      if (selected) {
        let array = assentoSelecionado.filter((assento) => assento !== id);
        setAssentoSelecionado(array);
      } else {
        setAssentoSelecionado([...assentoSelecionado, id]);
      }
    } else {
      alert("Assento não disponível...");
    }
  }

  return (
    <Cadacadeira
      onClick={() => select(isAvailable, id)}
      selected={selected}
      isAvailable={isAvailable}
    >
      {number}
    </Cadacadeira>
  );
}
const Cadacadeira = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background-color: ${(props) =>
    props.selected ? "#8dd7cf" : props.isAvailable ? "#c3cfd9" : "#fbe192"};
  border: 1px solid #808f9d;
  border-radius: 50%;
  font-size: 11px;
  font-family: "Roboto";
`;

