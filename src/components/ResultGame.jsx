import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import localforage from "localforage";

export default function ResultGame() {
  const [attempt, setAttempt] = useState(null);

  useEffect(() => {
    async function f() {
      const resultado = await localforage.getItem("historico");
      setAttempt(resultado);
    }
    f();
  }, []);

  if (!attempt) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <h1>Parabéns!</h1>
      <h2>Seus resultados</h2>
      
      <ul>
            {attempt.map((info, j) => (
              <li key={j}>
              <span>
                {info.nome}
                {info.pergunta}
                {info.resposta}
                {info.correto}
              </span>
              </li>
            ))}
            ;   Acertos: {attempt.score}
      </ul>
      
      <Link to="/quiz">
      {/*useNavigate está se mostrando mais versátil do que usar o Link,
      Aqui temos que impedir que o usuário que não preencheu o nome prossiga*/ }
        <button>Jogar novamente</button>
      </Link>
    </>
  );
}