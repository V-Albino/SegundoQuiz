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

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [options, setOptions] = useState(questions.map(q => randomiza(q.options)))
  const [result, setResult] = useState(Array(questions.length).fill(""))
  const [history, setHistory] = useState(result)
  const [score, setScore] = useState(0)

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

  function NextPage(){
    setCurrentQuestion(currentQuestion + 1)
  }
  
  function PreviousPage(){
    setCurrentQuestion(currentQuestion - 1)
  }
  function reset(){
    //adiciona resultado
    setCurrentQuestion(0)
    setResult(Array(questions.length).fill(""))
    setOptions(questions.map(q => randomiza(q.options)))
    setScore(0)
  }

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

      <p>Pontuação: {score} / {questions.length}</p>
      <button onClick={
        () => PreviousPage()} disabled={currentQuestion===0}>Anterior
      </button>
      <button onClick={
        () => NextPage()} disabled={currentQuestion===questions.length-1}>Proxima
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
      <div>
        <ol>
          <li>Historico</li>
        </ol>
      </div>
    </>
    
  )
}
