//use npm to install express and openai packages

const express = require('express');
const app = express();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey:''}); //replace 'API Key' with your API key

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a poet." },
            { role: "user", content: userInput }
        ],
    });

    res.json({ message: response.choices[0].message.content });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
