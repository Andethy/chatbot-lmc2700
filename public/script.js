async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput === '') {
        return;
    }
    document.getElementById('user-input').value = '';

    // updateChatBox('You: ' + userInput);
    appendMessage(userInput, 'user');
    const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    // console.log(data.reply)
    appendMessage(data.reply, 'bot');
}

async function resetChat() {
    const response = await fetch('http://localhost:3000/chat/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    console.log(data);
    resetChatBox(data);
}

function resetChatBox() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
}

function appendMessage(content, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender + '-message');
    // messageDiv.innerHTML += '<p class="message-text">' + content + '</p>';
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    chatBox.style.overflowY = 'hidden';
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    chatBox.innerHTML += '<br>';
    // chatBox.scrollTop = chatBox.scrollHeight;
    // wait a second then scroll to the bottom
    setTimeout(() => {
        chatBox.style.overflowY = 'scroll';
    }, 1000);

}
