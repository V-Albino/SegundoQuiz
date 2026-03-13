import { Link } from "react-router-dom";

export default function Start(){
  return(
    <>
      <h1>Perguntemos</h1>
      <p>Aperte o botão abaixo para começar</p>
      <Link to="/quiz">
        <button>Começar</button>
      </Link>
    </>
  )
}