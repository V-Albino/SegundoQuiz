import { Activity } from 'react'
import { QuizProvider, useQuiz } from './QuizContext';
import Quiz from './Quiz';
import ResultGame from './ResultGame';
import Start from './Start'
import './App.css'

export default function App() {
    const {activity} = useQuiz() //não utilize useQuiz no pai 
    return (
      <>
        <Activity mode={activity==="start" ? 'visible' : 'hidden'}>
          <Start />
        </Activity>

        <Activity mode={activity==="quiz" ? 'visible' : 'hidden'}>
            <Quiz />
        </Activity>

        <Activity mode={activity==="result" ? 'visible' : 'hidden'}>
          <ResultGame />
        </Activity>
      </>
    );
  }
