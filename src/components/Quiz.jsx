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
  const [resultado, setResultado] = useState([]);
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [nome, setNome] = useState("");
  const [counter,setCounter] = useState(60)

  
  useEffect(() => {
    function f() {
      const valor = localforage.getItem("nome");
      if (valor) setNome(valor);
      const hist = localforage.getItem("historico");
      if (hist) setHistory(hist);
    }
    f();
  }, []);

  useEffect(() => {
    if (counter === 0) {
      reset();
      navigate('/resultado')
    }
  }, [counter]);


  function verifica(opt){
    const resposta = [...resultado];
    const registro = {
      nome: nome,
      data: new Date(),
      pergunta: perguntas[currentQuestion].question,
      resposta: opt,
      correto: true
    };

    const novoHistorico = [...history, registro];
    if(opt === perguntas[currentQuestion].options[0]){
      registro.correto = true;
      resposta[currentQuestion] = "Resposta Correta";
      setScore(score + 1);
    }
    
    else{
      registro.correto = false;
      resposta[currentQuestion] = "Resposta Errada";
    }

    setResultado(resposta);
    setHistory(novoHistorico);
    localforage.setItem("historico", novoHistorico)
  }

  function randomiza(vet){
    const arr = [...vet];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  async function reset(){
    const attempt = {
      answers: [...resultado],
      score: score
    };
      /*
    
    const aux = [...history, attempt]
    setHistory(aux)
    */
    await localforage.setItem("resultado", attempt)
    
    setCurrentQuestion(0);
    setResultado(Array(perguntas.length).fill(""));
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

    <div style={{height: "20px"}}>
      <p className="read-the-docs"> 
        {resultado[currentQuestion]} 
      </p>
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
        <button onClick={() => reset()}>Finalizar Tentativa</button>
      </Link>
    </div>
  </>
)
}