import { Link } from 'react-router-dom';
import questions from '../questions.json'
import localforage from 'localforage';

export default function Jogos() {
    return(
        <nav className='jogos'>
            <h1>Escolha uma categoria</h1>
            <ul style={{display:'flex'}}>
                {questions.map((q, id) => (
                    <li key={id}>
                        <Link to={`/quiz/${id}`}>
                            <button>{q.theme}</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};