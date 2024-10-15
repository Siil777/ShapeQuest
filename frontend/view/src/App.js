import './App.css';
import React, { useEffect, useState } from 'react';
function App() {
  const [questions, setQuestions] = useState([]);
  const [currenIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    fetch('http://localhost:5000/get/data')
    .then((response)=>response.json())
    .then((data)=>{
      setQuestions(data.questions);
      setLoading(false);

    })
    .catch((error)=>console.error('fetch error occurred', error));
  }, []);

  const handleNextQuestion = () => {
    if(currenIndexQuestion<questions.length-1){
      setCurrentIndexQuestion(currenIndexQuestion + 1);
    }
  }
  const handlePreviousQuestion = () => {
    if(currenIndexQuestion>0){
      setCurrentIndexQuestion(currenIndexQuestion - 1);
    }
  }
  if(loading) return <p>Loading...</p>

  return(
   <div className='d-grid justify-content-center mt-5'>
    {questions ?(
      <div>
        <p>{questions[currenIndexQuestion]}</p>
        <div className='d-flex justify-content-center gap-3'>
          <button onClick={handlePreviousQuestion} disabled={currenIndexQuestion===0}>
              Previous
          </button>
          <button onClick={handleNextQuestion} disabled={currenIndexQuestion===questions.length-1}>
            Next 
          </button>
        </div>

      </div>
    ):(
      <p>No questions avalible...</p>
    )}
   </div>
  )
}
export default App;
