import config from './public/config/config.js';

export function appendMessage(messageBox, message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageBox.appendChild(messageElement);
}

export function socketImplementation(messageBox, messageForm, messageInput) {
const socket = io(config.apiUrl);
const name = sessionStorage.getItem("username");
// const users = {};

socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(messageBox, `${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(messageBox, `${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(messageBox, `${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submit handler triggered");
  const message = messageInput.value;
  appendMessage(messageBox, `You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});
}