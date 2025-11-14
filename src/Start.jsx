import { useQuiz } from "./QuizContext"
export default function Start(){
const {setActivity} = useQuiz()
  return(
    <>
      <h1>Perguntemos</h1>
      <p>Aperte o botão abaixo para começar</p>
      <button onClick={(e) => setActivity("quiz")}>Começar</button>
    </>
  )
}