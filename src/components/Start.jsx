import { Link } from "react-router-dom";
import { useRef } from "react";
import localforage from "localforage";  


export default function Start() {
  const inputRef = useRef("");

  async function salvaNome() {
    const valor = inputRef.current.value;
    try {
      await localforage.setItem("nome", valor);
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <>
      <h1 style={{marginBottom: "100px"}}>Perguntemos</h1>
      <div style={{margin: "100px", display: "grid", gridTemplateRows: "auto", justifyItems: "center"}}>
        <img src="src/Icon.png" alt="icone" width="100" height="100"/>
        <input ref={inputRef} onChange={() => salvaNome()} placeholder="Digite seu nome..."></input>
      </div>
      <p>Aperte o botão abaixo para começar</p>
      <Link to="/quiz">
        <button >Começar</button>
      </Link>
    </>
  )
}