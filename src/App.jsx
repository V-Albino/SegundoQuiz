import { useState } from 'react'
import questions from './questions.json'
import './App.css'

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [result, setResult] = useState(Array(questions.length).fill(""))
  const [score, setScore] = useState(0)

  function verifica(i){
    const resposta = [...result]
    if(i === questions[currentQuestion].answer){
      resposta[currentQuestion] = "Resposta Correta"
      setScore(score + 1)
    }else{
      resposta[currentQuestion] = "Resposta Errada"
    }
    setResult(resposta)
  }

  function NextPage(){
    if(currentQuestion < questions.length - 1){
      setCurrentQuestion(currentQuestion + 1)
    }
  }
  
  function PreviousPage(){
    if(currentQuestion > 0){
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  return (
    <>
      <h1>Perguntas Gerais</h1>

      <div className="">
        <p>
          {currentQuestion + 1} - {questions[currentQuestion].question}
        </p>

        {questions[currentQuestion].options.map((_, index) => (
          <button onClick={() => verifica(index)} disabled = {result[currentQuestion] !== ""}>
            {questions[currentQuestion].options[index]}
          </button>
        ))}

      </div>

      <div style={{height: "20px"}} >
      <p className="read-the-docs"> 
        {result[currentQuestion]} 
      </p>
      </div>

      <p>Pontuação: {score} / {questions.length}</p>
      <button onClick={
        () => PreviousPage()}>Anterior
      </button>
      <button onClick={
        () => NextPage()}>Proxima
      </button>

      <div style={{marginTop:"10px"}}>
      {questions.map((_, index)=>(
        <button key={index} onClick={() => setCurrentQuestion(index)}>
          {index+1}
        </button>
      ))}
      </div>
    </>
  )
}
