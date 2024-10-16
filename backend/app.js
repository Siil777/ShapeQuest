const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const port = 5000;
const allowedOrigins = [
    'https://siil777.github.io/ShapeQuest',
    'http://localhost:3000'
];
const corsOptions = {
    origin: (origin,callback) => {
        if(!origin || allowedOrigins.indexOf(origin)!==-1){
            callback(null,true)
        }else{
            callback(new Error('Origin is not allowed by CORS'))
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}
const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/get/data', async (req,res)=>{
    async function getQuestions() {
        try{
            const filePath = path.join(__dirname, 'questionnaire', 'questionnaire.json');
            const fileData = await fs.promises.readFile(filePath, 'utf-8');
            const data = JSON.parse(fileData);
            console.log(data);
            res.json(data);

        }catch(e){
            console.error(e);
        }
    }
    await getQuestions();
});

app.post('/submit/answers', (req,res)=>{
    let userAnswers = req.body.selectedAnswer;
    let score = 0;
    userAnswers.forEach((answer) => {
        if (answer === 'Health improvement') score += 1;
        if (answer === 'Aesthetic reasons') score += 1;
        if (answer === 'Increased energy levels') score += 1;
        if (answer === 'Medical recommendation') score += 1;
        if (answer === 'Sedentary') score += 1;
        if (answer === 'Lightly active') score += 1;
        if (answer === 'Moderately active') score += 1;
        if (answer === 'Very active') score += 1;
        if (answer === 'I eat a balanced diet') score += 1;
        if (answer === 'I prefer fast food') score += 1;
        if (answer === 'I’m a vegetarian') score += 1;
        if (answer === 'I’m on a special diet (keto, paleo, etc.)') score += 1;
        if (answer === 'Yes') score += 1;
        if (answer === 'No') score += 1;
        if (answer === 'Lack of time') score += 1;
        if (answer === 'Cravings') score += 1;
        if (answer === 'Social pressure') score += 1;
        if (answer === 'Lack of motivation') score += 1;
        if (answer === 'Other') score += 1;
        if (answer === 'Under 1 month') score += 1;
        if (answer === '1-3 months') score += 1;
        if (answer === '3-6 months') score += 1;
        if (answer === '6-12 months') score += 1;
        if (answer === 'More than a year') score += 1;
    });
    let feedback = '';

    if(score>=10){
        feedback='You are on the right path';
    }else if(score>=20){
        feedback='This is diet would be suitable for you the most';
    }else{
        feedback='keep it going';
    }
    res.json({
        score,
        feedback
    });

});






app.listen(port, ()=>console.log(`app is runnig at port ${port}`));