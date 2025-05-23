import { handleLogin } from "../routes/loginFunctionality.js";

const toggleBtn = document.getElementById("theme-toggle");
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");

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


const socket = io('http://localhost:5000');
const messageBox = document.getElementById('messageBox')
const messageForm = document.getElementById('send-region');
const messageInput = document.getElementById('message-input');
let name;

handleLogin(req, res, (username) => {
  name = username;
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}

socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

