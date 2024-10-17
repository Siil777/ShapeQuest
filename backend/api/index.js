const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

const allowedOrigins = ['https://siil777.github.io', 'http://localhost:3000','http://localhost:5000'];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req,res)=>{
    res.redirect('/get/data')
})
app.get('/get/data', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'questionnaire', 'questionnaire.json');
        const fileData = await fs.promises.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileData);
        console.log(data);
        res.json(data);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error reading questionnaire file');
    }
});
app.get('/', (req,res)=>{
    res.redirect('/submit/answers')
})
app.post('/submit/answers', (req, res) => {
    let userAnswers = req.body.selectedAnswer;
    let score = 0;

    userAnswers.forEach((answer) => {
        const scoringAnswers = [
            'Health improvement',
            'Aesthetic reasons',
            'Increased energy levels',
            'Medical recommendation',
            'Sedentary',
            'Lightly active',
            'Moderately active',
            'Very active',
            'I eat a balanced diet',
            'I prefer fast food',
            'I’m a vegetarian',
            'I’m on a special diet (keto, paleo, etc.)',
            'Yes',
            'No',
            'Lack of time',
            'Cravings',
            'Social pressure',
            'Lack of motivation',
            'Other',
            'Under 1 month',
            '1-3 months',
            '3-6 months',
            '6-12 months',
            'More than a year',
        ];

        if (scoringAnswers.includes(answer)) score += 1;
    });

    let feedback = '';

    if (score >= 10) {
        feedback = 'You are on the right path';
    } else if (score >= 20) {
        feedback = 'This diet would be suitable for you the most';
    } else {
        feedback = 'Keep it going';
    }

    res.json({
        score,
        feedback,
    });
});

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
module.exports = app;