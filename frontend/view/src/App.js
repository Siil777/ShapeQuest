import './App.css';
import React, { useEffect, useState } from 'react';
function App() {

  const [data, setData] = useState(null);

  useEffect(()=>{
    fetch('http://localhost:5000/get/data')
    .then((response)=>response.json())
    .then((data)=>{
      setData(data);

    })
    .catch((error)=>console.error('fetch error occurred', error));
  }, []);
  return(
   <div>
    {data && data.questions ?(
      <ul>
        {data.questions.map((question, index)=>(
          <li key={index}>{question}</li>
        ))}
      </ul>
    ):(
      <p>Loading questions...</p>
    )}
   </div>
  )
}
export default App;
