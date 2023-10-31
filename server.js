// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//TODO: insert description of the bot here
let chatHistory = [{role: "system", content: "You are []"}];

app.use(bodyParser.json());
app.use(cors()); // configure CORS as needed

// Endpoint to receive user input and return the chatbot response
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    chatHistory.push({ role: "user", content: userMessage });

    const completion = await openai.chat.completions.create({
        messages: chatHistory,
        model: "gpt-3.5-turbo",
    });

    const botMessage = completion.choices[0].message.content;
    chatHistory.push({ role: "system", content: botMessage });

    res.send({ reply: botMessage });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
