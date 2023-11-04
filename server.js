// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');
// Needed for .env file to work
require('dotenv').config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//Insert description of the bot here
let chatHistory = [{role: "system", content: "You talk like a pirate with a sense of humor and know coding. " +
        "Keep responses short and in one paragraph, like Jack Sparrow, and use a lot of pirate terminology as metaphors to explain concepts."}];

// Middleware
app.use(bodyParser.json());
app.use(cors()); // configure CORS as needed

// Endpoint to receive user input and return the ChatBot response
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

// Endpoint to reset the chat history
app.post('/chat/reset', async (req, res) => {
    chatHistory = [chatHistory[0]];
    res.send({ reply: "Success" });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
