import { useState } from 'react'
import questions from './questions.json'
import './App.css'


function randomiza(vet){
  const arr = [...vet]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App(){
  const [start, setStart] = useState(false)
  if(!start){
    return (
      <>
        <h1>Perguntemos</h1>
        <p>Aperte o botão abaixo para começar</p>
        <button onClick={() => setStart(true)}>Começar</button>
      </>
    )
  }
  else if(start){
    return <Game />  
  }
}

function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [options, setOptions] = useState(questions.map(q => randomiza(q.options)))
  const [result, setResult] = useState(Array(questions.length).fill(""))
  const [history, setHistory] = useState([])
  const [score, setScore] = useState(0)
  const [emPartida, setEmPartida] = useState(true)

  function verifica(opt){
    const resposta = [...result]
    if(opt === questions[currentQuestion].options[0]){
      resposta[currentQuestion] = "Resposta Correta"
      setScore(score + 1)
    }else{
      resposta[currentQuestion] = "Resposta Errada"
    }
    setResult(resposta)
  }


  function reset(){
    const attempt = {
      answers: [...result],
      score: score
    };
    const aux = [...history, attempt]
    setHistory(aux)

    setCurrentQuestion(0)
    setResult(Array(questions.length).fill(""))
    setOptions(questions.map(q => randomiza(q.options)))
    setEmPartida(false)
    setScore(0)
  }

  if(emPartida){
    return (
    <>
      <h1>Perguntas Gerais</h1>
      <div className="">
        <p>
          {currentQuestion + 1} - {questions[currentQuestion].question}
        </p>
        {options[currentQuestion].map((option, _) => (
          <button key={option} onClick={() => verifica(option)} disabled = {result[currentQuestion] !== ""}>
            {option}
          </button>
        ))}
      </div>

      <div style={{height: "20px"}}>
      <p className="read-the-docs"> 
        {result[currentQuestion]} 
      </p>
      </div>

      <p>Acertos: {score} / {questions.length}</p>
      <button onClick={
        () => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion===0}>Anterior
      </button>
      <button onClick={
        () => setCurrentQuestion(currentQuestion + 1)} disabled={currentQuestion===questions.length-1}>Proxima
      </button>

      <div style={{marginTop:"10px", marginBottom:"10px"}}>
      {questions.map((_, index)=>(
        <button key={index} onClick={() => setCurrentQuestion(index)}>
          {index+1}
        </button>
      ))}
      </div>
      <div>
        <button onClick={() => reset()}>Finalizar Tentativa</button>
      </div>
    </>
    )
  }

  else if(!emPartida){
    return (
      <>
      
      <h2>Resultados</h2>
      <ul>
        {history.map((attempt, index) => (
          <li key={index}>
            Tentativa {index + 1}: [
            {attempt.answers.map((resp, i) => (
              <span key={i}>
                {resp === "Resposta Correta" ? 'C' : (resp === "" ? '-' : 'E')}
                {i < attempt.answers.length - 1 ? ' , ' : ''}
              </span>
            ))}
            ]
            ;   Acertos: {attempt.score}
          </li>
        ))}
      </ul>
      <button onClick={() => setEmPartida(true)}>Jogar novamente</button>
      </>
    )
  }
}
