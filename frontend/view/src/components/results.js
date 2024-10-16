

const handleSubmit = (selectedAnswer) => {

    fetch('http:/localhost:5000/submit/answers',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({selectedAnswer})
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log('Scores:', data.score);
        console.log('Feedback', data.feedback);
    })
    .catch((error)=>console.error(error));
}
export default handleSubmit;