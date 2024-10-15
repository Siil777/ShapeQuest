import './App.css';
import React, { useEffect, useState } from 'react';
import CircularProgressIcon from './components/progressCircle.js';
import ButtonGroupComponent from './components/buttons.js';
function App() {
  const [questions, setQuestions] = useState([]);
  const [currenIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(()=>{
    fetch('http://localhost:5000/get/data')
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      setQuestions(data.questions);
      setLoading(false);

    })
    .catch((error)=>console.error('fetch error occurred', error));
    setLoading(false);
  }, []);

  const handleNextQuestion = () => {
    if(currenIndexQuestion<questions.length-1){
      setCurrentIndexQuestion(currenIndexQuestion + 1);
      setProgress((prevProgress)=> Math.min(prevProgress + Math.floor(120/questions.length), 100));
    }
  }
  const handlePreviousQuestion = () => {
    if(currenIndexQuestion>0){
      setCurrentIndexQuestion(currenIndexQuestion - 1);
      setProgress((prevProgress)=> Math.max(prevProgress - Math.floor(120/questions.length), 0));
    }
  }
  if(loading) return <p>Loading...</p>

  return(
   <div className='d-grid justify-content-center mt-5'>
    {questions ?(
      <div>
        <p>{questions[currenIndexQuestion]?.question}</p>
        <ul>
          {questions[currenIndexQuestion]?.answers.map((answer,index)=>(
            <li key={index}>{answer}</li>
          ))}
        </ul>
        <div className='d-flex justify-content-center gap-3'>
         <ButtonGroupComponent 
         onNext={handleNextQuestion}
         onPrevious={handlePreviousQuestion}
         disableNext={currenIndexQuestion===questions.length-1}
         disablePrevious={currenIndexQuestion===0}
         />
        </div>
        <CircularProgressIcon value={progress} />
      </div>
    ):(
      <p>No questions avalible...</p>
    )}
   </div>
  )
}
export default App;
