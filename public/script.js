async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    document.getElementById('user-input').value = '';

    updateChatBox('You: ' + userInput);
    const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    console.log(data.reply)
    updateChatBox('Bot: ' + data.reply);
}

function updateChatBox(message) {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += '<p>' + message + '</p>';
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
}
