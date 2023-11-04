
// Sends a message to the server
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    // Handles empty user input
    if (userInput === '') {
        return;
    }
    document.getElementById('user-input').value = '';

    //
    appendMessage(userInput, 'user');
    // Retrieve the bots response
    const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    });

    // Get the response from the server
    const data = await response.json();
    // Add the bots response to the chat box
    appendMessage(data.reply, 'bot');
}

// Resets the chat history
async function resetChat() {
    // Send a request to the server to reset the chat history
    const response = await fetch('http://localhost:3000/chat/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Get the response from the server
    const data = await response.json();
    // Add the bots response to the chat box (output to console for debugging)
    console.log(data);
    resetChatBox(data);
}

// Resets the chat box
function resetChatBox() {
    // Clear the chat box
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
}

// Appends a message to the chat box
function appendMessage(content, sender) {
    // Create a new message div element to add to the chat box
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender + '-message');
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);

    // Immediately after appending, set overflow and scroll to bottom
    chatBox.style.overflowY = 'scroll';
    chatBox.scrollTop = chatBox.scrollHeight;
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
document.getElementById('chat-box').addEventListener('scroll', checkVisibility);