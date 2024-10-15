const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const port = 5000;

const app = express();
app.use(cors());
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
})






app.listen(port, ()=>console.log(`app is runnig at port ${port}`));