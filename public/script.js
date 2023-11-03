var count = 1;
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
    // messageDiv.innerHTML += '<pre>' + content + '</pre>';
    messageDiv.textContent = content;
    count++;
    messageDiv.style.zIndex = count + '';
    chatBox.appendChild(messageDiv);
    // chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    // chatBox.scrollTop = chatBox.scrollHeight;
    // wait a second then scroll to the bottom
    chatBox.style.transform = 'translateZ(0)';

    setTimeout(() => {
        chatBox.style.transform = 'translateZ(0)';
        chatBox.style.overflowY = 'auto';
        chatBox.style.transform = 'translateZ(0)';
        chatBox.style.display = 'none';
        chatBox.offsetHeight; // Trigger reflow
        chatBox.style.display = 'block';
    }, 1000);
    chatBox.style.transform = 'translateZ(0)';

}


// This function checks the visibility based on the scroll position
function checkVisibility() {
    const windowHeight = window.innerHeight; // Get the window height
    const elements = document.querySelectorAll('.dynamic-visibility'); // Get all elements you want to check

    elements.forEach((el) => {
        const rect = el.getBoundingClientRect(); // Get the position of the element relative to the viewport
        const top = rect.top;
        const bottom = rect.bottom;

        // Check if the element is within the viewport
        if (top < windowHeight && bottom >= 0) {
            // Element is visible
            el.style.opacity = '1';
        } else {
            // Element is not visible
            el.style.opacity = '0';
        }
    });
}

// Listen for the scroll event on window
// window.addEventListener('scroll', checkVisibility);
document.getElementById('chat-box').addEventListener('scroll', checkVisibility);