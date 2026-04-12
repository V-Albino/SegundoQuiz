import { useState, useEffect} from 'react';
import questions from '../questions.json';
import { useParams, Link, useNavigate} from 'react-router-dom';
import localforage from 'localforage';
import Timer from '../Timer';
import'../App.css'


export default function Quiz(){
  const navigate = useNavigate()
  const {id} = useParams();
  const temaIndex = Number(id);
  const tema = questions[temaIndex];
  if(!tema){
    return (
    <h1>Quiz não encontrado</h1>
    )
  }
  const perguntas = tema.questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState(perguntas.map(q => randomiza(q.options)));
  const [history, setHistory] = useState([]);
  const [partida, setPartida] = useState({tema: tema.theme, respostas:[]});
  const [score, setScore] = useState(0);
  const [nome, setNome] = useState("");
  const [counter,setCounter] = useState(60)

  
  useEffect(() => {
    async function f() {
      const valor = await localforage.getItem("nome");
      if (valor) setNome(valor);
      const hist = await localforage.getItem("historico");
      if (hist) setHistory(hist);
    }
    f();
  }, []);

  useEffect(() => {
    if (counter === 0) {
      atualiza();
      navigate('/resultado')
    }
  }, [counter]);


  function verifica(opt){
    const registro = {
      nome: nome,
      data: new Date(),
      pergunta: perguntas[currentQuestion].question,
      resposta: opt,
      correto: true
    };
    
    if(opt === perguntas[currentQuestion].options[0]){
      registro.correto = true;
      setScore(score + 1);
    }else{
      registro.correto = false;
    }

    const novoRegistro = [...partida.respostas, registro];

    const novaPartida = {
      tema: tema.theme,
      respostas:novoRegistro
    }

    setPartida(novaPartida);
  }

  function randomiza(vet){
    const arr = [...vet];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function atualiza(){
    let novoHistorico = [...history];
    novoHistorico.push(partida);
    localforage.setItem("historico", novoHistorico)

    setCurrentQuestion(0);
    setOptions(perguntas.map(q => randomiza(q.options)));
    setScore(0);
  }

return(
  <>
    <h1>{tema.theme}</h1>
    
    <div style={{display: "flex", justifyContent: "space-between"}}>
      Tempo: {<Timer counter={counter} setCounter={setCounter} />}
    </div>
    
    <div>
      <p>
        {currentQuestion + 1} - {perguntas[currentQuestion].question}
      </p>
      {options[currentQuestion].map((option, _) => (
        <button key={option} onClick={() => verifica(option)} >
          {option}
        </button>
      ))}
    </div>

    <div className='user'>
      <h2>{nome}</h2>
    </div>

    <p>Acertos: {score} / {perguntas.length}</p>
    <button onClick={() => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion === 0}>Anterior</button>
    <button onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={currentQuestion === perguntas.length - 1}>Proxima</button>

    <div style={{marginTop:"10px", marginBottom:"10px"}}>
      {perguntas.map((_, index) => (
        <button key={index} onClick={() => setCurrentQuestion(index)}>
          {index + 1}
        </button>
      ))}
    </div>
    <div>
      <Link to="/resultado">
        <button onClick={() => atualiza()}>Finalizar Tentativa</button>
      </Link>
    </div>
  </>
)
}