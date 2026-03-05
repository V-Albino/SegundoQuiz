import { createContext, useContext, useState } from "react";
import questions from "./questions.json";

const QuizContext = createContext();

function randomiza(vet){
  const arr = [...vet]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function QuizProvider({children}){
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [options, setOptions] = useState(questions.map(q => randomiza(q.options)))
    const [result, setResult] = useState(Array(questions.length).fill(""))
    const [history, setHistory] = useState([])
    const [score, setScore] = useState(0)
    const [activity, setActivity] = useState("start")

    return(
        <QuizContext.Provider value={{
            currentQuestion, setCurrentQuestion,
            options, setOptions,
            result, setResult,
            history, setHistory,
            score, setScore,
            activity, setActivity
        }}>
        {children}
        </QuizContext.Provider>
    )
}

export const useQuiz = () => useContext(QuizContext);