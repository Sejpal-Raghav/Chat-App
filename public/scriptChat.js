import { themeToggle } from "./utils/themeToggle.js";
const toggleBtn = document.getElementById("theme-toggle");
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");
themeToggle(lightIcon, darkIcon, toggleBtn);


const usernameDisplay = document.getElementById("usernameDisplay");
usernameDisplay.innerText = sessionStorage.getItem("username");

const socket = io("localhost:5000");
const messageBox = document.getElementById("messageBox");
const messageForm = document.getElementById("send-region");
const messageInput = document.getElementById("message-input");

const name = sessionStorage.getItem("username");

const users = {};

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageBox.appendChild(messageElement);
}

socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submit handler triggered");
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

console.log("messageBox element:", document.getElementById("messageBox"));
console.log(
  "All elements with messageBox class:",
  document.getElementsByClassName("messageBox")
);
console.log("Document ready state:", document.readyState);
