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
        if (answer === 'Health improvement') score += 1;
        if (answer === 'Aesthetic reasons') score += 2;
        if (answer === 'Increased energy levels') score += 3;
        if (answer === 'Medical recommendation') score += 4;
        if (answer === 'Sedentary') score += 5;
        if (answer === 'Lightly active') score += 1;
        if (answer === 'Moderately active') score += 2;
        if (answer === 'Very active') score += 3;
        if (answer === 'I eat a balanced diet') score += 4;
        if (answer === 'I prefer fast food') score += 5;
        if (answer === 'I’m a vegetarian') score += 1;
        if (answer === 'I’m on a special diet (keto, paleo, etc.)') score += 2;
        if (answer === 'Yes') score += 3;
        if (answer === 'No') score += 4;
        if (answer === 'Lack of time') score += 5;
        if (answer === 'Cravings') score += 1;
        if (answer === 'Social pressure') score += 2;
        if (answer === 'Lack of motivation') score += 3;
        if (answer === 'Other') score += 4;
        if (answer === 'Under 1 month') score += 5;
        if (answer === '1-3 months') score += 2;
        if (answer === '3-6 months') score += 3;
        if (answer === '6-12 months') score += 1;
        if (answer === 'More than a year') score += 1;
    });

    let feedback = '';

    if (score >= 10) {
        feedback = 'You are on the right path, no special diet required';
    } else if (score >= 20) {
        feedback = 'Some fresh vegetable diet might be wouldn not be superfluous';
    } else {
        feedback = 'Keep it at';
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