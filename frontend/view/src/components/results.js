

const handleSubmit = (selectedAnswer) => {

    fetch('https://backend-hpteqpghg-olivers-projects-6baf31af.vercel.app/submit/answers',{
        method: 'POST',
        headers: {
            'Authorization': `Bearer obTwytpxHvbZitopU1Xhi5FV`,
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