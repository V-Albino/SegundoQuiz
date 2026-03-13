import { Link } from 'react-router-dom';
import '../index.css';
export const NotFound = () => {
    return(
        <>
        <h1> Not Found</h1>
        <Link to="/">
            <button>Voltar</button>
        </Link>
        </>
    );
};