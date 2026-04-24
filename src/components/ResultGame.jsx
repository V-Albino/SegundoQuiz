import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import localforage from "localforage";
import "./ResultGame.css";


export default function ResultGame() {
  const [historico, setHistorico] = useState(null);

  useEffect(() => {
    async function f() {
      const resultado = await localforage.getItem("historico");
      setHistorico(resultado);
    }
    f();
  }, []);

  if (!historico) {
    return <div>Carregando...</div>;
  }

  const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/Sao_Paulo",
}
  const formatter = new Intl.DateTimeFormat('pt-BR', options);

  return (
    <>
      <h1>Parabéns!</h1>
      <h2>Seus resultados</h2>
      
      <ol className="tentativas">
      {historico.map((tentativa, i) => (
        <li key={`tentativa${i}`}>
          <ol className="respostas">
            {tentativa.respostas.map((info, j) => (
              <li key={`resposta${j}`}>
                <div>{info.correto?"✅":"⛔"}</div>
                <div>{info.nome}</div>
                <div>{formatter.format(info.data)}</div>
                <div>{tentativa.tema}</div>
                <div>{info.pergunta}</div>
                <div>{info.resposta}</div>
              </li>
            ))}
            </ol>
          <div className="pontuacao">Pontuação: {tentativa.score}</div>
        </li>
      ))}
      </ol>
      
      <Link to="/quiz">
        <button>Jogar novamente</button>
      </Link>
    </>
  );
}