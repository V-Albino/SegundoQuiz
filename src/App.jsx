import './App.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import Quiz from './components/Quiz';
import ResultGame from './components/ResultGame';
import Start from './components/Start'
import { NotFound } from './components/NotFound';
  
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element= {<Start />}/>
      <Route path="/quiz" element= {<Quiz />}/>
      <Route path="/quiz/:id" element= {<Quiz />}/>
      {/* <Route path="/resultado" element= {<ResultGame />}/> */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}