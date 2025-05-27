import { themeToggle } from "./utils/themeToggle.js";
import { socketImplementation, appendMessage } from "./sockets/socketNewMessages.js";
const toggleBtn = document.getElementById("theme-toggle");
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");
themeToggle(lightIcon, darkIcon, toggleBtn);

const usernameDisplay = document.getElementById("usernameDisplay");
usernameDisplay.innerText = sessionStorage.getItem("username");

const messageBox = document.getElementById("messageBox");
const messageForm = document.getElementById("send-region");
const messageInput = document.getElementById("message-input");
socketImplementation(messageBox, messageForm, messageInput);