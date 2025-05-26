const toggleBtn = document.getElementById("theme-toggle");
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");

const usernameDisplay = document.getElementById("usernameDisplay")
usernameDisplay.innerText = sessionStorage.getItem('username');

const theme = document.documentElement.getAttribute("data-theme");

if (theme === "dark") {
    lightIcon.style.display = "none";
    darkIcon.style.display = "inline";
} else {
    lightIcon.style.display = "inline";
    darkIcon.style.display = "none";
}

toggleBtn.addEventListener("click", () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);

  if (newTheme === "dark") {
    lightIcon.style.display = "none";
    darkIcon.style.display = "inline";
  } else {
    lightIcon.style.display = "inline";
    darkIcon.style.display = "none";
  }
});


const socket = io('localhost:5000');
const messageBox = document.getElementById('messageBox')
const messageForm = document.getElementById('send-region');
const messageInput = document.getElementById('message-input');

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageBox.appendChild(messageElement)
}

socket.emit('new-user', name)

socket.on('chat-message', (data) => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', (name) => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', (name) => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Submit handler triggered");
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
})

console.log('messageBox element:', document.getElementById('messageBox'));
console.log('All elements with messageBox class:', document.getElementsByClassName('messageBox'));
console.log('Document ready state:', document.readyState);