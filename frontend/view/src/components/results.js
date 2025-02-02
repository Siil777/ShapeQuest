const handleSubmit = (selectedAnswer, setAlert) => {

    fetch('https://backend-tau-three-72.vercel.app/submit/answers',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({selectedAnswer})
    })
    .then((response)=>response.json())
    .then((data)=>{
        setAlert({
            score: data.score,
            feedback: data.feedback,
            visible: true
        })
        
    })
    .catch((error)=>console.error(error));
}
export default handleSubmit;
