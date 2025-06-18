export function appendMessage(messageBox, message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageBox.appendChild(messageElement);
}

export function socketImplementation(messageBox, messageForm, messageInput) {
  const socket = io(window.location.origin);
  const name = sessionStorage.getItem("username");
  const numberOfPeople = document.querySelector('.numberOfPeople');
  const onlineUsers = document.querySelector('.onlineUsers');
  socket.emit("new-user", name);
  socket.on("chat-message", (data) => {
    if (data.name === name) {
      appendMessage(messageBox, `You: ${data.message}`);
    } else {
      appendMessage(messageBox, `${data.name}: ${data.message}`);
    }
  });
  socket.on("user-connected", (name) => {
    appendMessage(messageBox, `${name} connected`);
  });
  socket.on("user-disconnected", (name) => {
    appendMessage(messageBox, `${name} disconnected`);
  });
  socket.on("user-list", (userList) => {
    if (onlineUsers) {
      onlineUsers.innerHTML = 'Online users:<br>' + userList.map(u => `<span>${u}</span>`).join('<br>');
    }
  });
  socket.on("user-count", (count) => {
    if (numberOfPeople) {
      numberOfPeople.innerText = `Number of people Online: ${count}`;
    }
  });
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit("send-chat-message", message);
    messageInput.value = "";
  });
}