//use npm to install openai package

//Import the OpenAI library,this line imports the OpenAI library that provides access to OpenAI's API.
const OpenAI = require('openai');

//Create an instance of the OpenAI client
const openai = new OpenAI({ apiKey:'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'}); //replace 'API Key' with your API key


//Define an async function named main
async function main() {
  const completion = await openai.chat.completions.create({
    messages: 
    [{ 
        //The system message, with the role "system," is used to set the initial context or behavior for the model.
        role: "system", 
        content: "You are a poet." 
    },
    {   //The user message, with the role "user," represents the message or query from the user. 
        role: "user", 
        content: "Hi,How are you?" 
    }],
    // the model we used
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);
}

//call the main() function
main();