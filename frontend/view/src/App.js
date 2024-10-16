import './App.css';
import React, { useEffect, useState } from 'react';
import CircularProgressIcon from './components/progressCircle.js';
import ButtonGroupComponent from './components/buttons.js';
import RadioButton from './components/radiobuttons.js';
import handleSubmit from './components/results.js';
import './scss/style.scss';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currenIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [allAnswers, setAllAnswers] = useState([]);
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
    const updateAnswers = [...allAnswers];
    updateAnswers[currenIndexQuestion] = selectedAnswer;
    setAllAnswers(updateAnswers);
    if(currenIndexQuestion<questions.length-1){
      setCurrentIndexQuestion(currenIndexQuestion + 1);
      setProgress((prevProgress)=> Math.min(prevProgress + Math.floor(120/questions.length), 100));
    }
    setSelectedAnswer(updateAnswers[currenIndexQuestion + 1] ||'');
  }
  const handlePreviousQuestion = () => {
    if(currenIndexQuestion>0){
      setCurrentIndexQuestion(currenIndexQuestion - 1);
      setProgress((prevProgress)=> Math.max(prevProgress - Math.floor(120/questions.length), 0));
    }
    setSelectedAnswer(allAnswers[currenIndexQuestion - 1] ||'');
  }
  const finalResult = () => {
    handleSubmit(allAnswers);
  }
  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  }
  if(loading) return <p>Loading...</p>

  return(
   <div className='d-grid justify-content-center mt-5'>
    {questions ?(
      <div>
      <div className='content'>
      <p>{questions[currenIndexQuestion]?.question}</p>
        <ul>
          {questions[currenIndexQuestion]?.answers.map((answer,index)=>(
            <RadioButton 
            key={index}
            value={answer}
            onChange={handleAnswerChange}
            checked={selectedAnswer===answer}
            name={`question-${currenIndexQuestion}`}
            />
          ))}
        </ul> 
        </div>
        <div className='d-flex justify-content-center gap-5'>
         <ButtonGroupComponent 
         onNext={handleNextQuestion}
         onPrevious={handlePreviousQuestion}
         disableNext={currenIndexQuestion===questions.length-1}
         disablePrevious={currenIndexQuestion===0}
         />
         {currenIndexQuestion===questions.length-1 && (
          <button className='btn btn-outline-primary' onClick={finalResult}>
            Finish
          </button>
         )}
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
