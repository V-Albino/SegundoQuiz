

export default function ResultGame(){
    const {history, setActivity} = useQuiz();
  return (
    <>
      <h2>Resultados</h2>
      <ul>
        {history.map((attempt, index) => (
          <li key={index}>
            Tentativa {index + 1}: (
            {attempt.answers.map((resp, i) => (
              <span key={i}>
                {resp === "Resposta Correta" ? 'C' : (resp === "" ? '-' : 'E')}
                {i < attempt.answers.length - 1 ? ' , ' : ''}
              </span>
            ))}
            )
            ;   Acertos: {attempt.score}
          </li>
        ))}
      </ul>
      <Link to="/quiz">
        <button>Jogar novamente</button>
      </Link>
    </>
  )
}