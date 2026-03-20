import { Link } from 'react-router-dom';
import questions from '../questions.json'

export default function Jogos() {
    return(
        <nav className='jogos'>
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