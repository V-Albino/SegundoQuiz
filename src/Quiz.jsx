import { useQuiz } from "./QuizContext"
import questions from './questions.json'

export default function Quiz(){
  const {currentQuestion, setCurrentQuestion, options,setOptions, result, setResult, score, setActivity} = useQuiz()

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
    setActivity("result")
    setScore(0)
  }

return(
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