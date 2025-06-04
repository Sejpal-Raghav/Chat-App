import { themeToggle } from "./utils/themeToggle.js";
const toggleBtn = document.getElementById("theme-toggle");
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");
themeToggle(lightIcon, darkIcon, toggleBtn);
const privateChatRoomButton = document.getElementById("here_privateChatRoom");

privateChatRoomButton.addEventListener("click", () => {
  function getRandomInt(min, max) {
    min = 123456;
    max = 943987;
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
const roomId = getRandomInt();
  window.location.href = "/privateChat/id=" + roomId.toString();
})

const form = document.getElementById('form');
form.addEventListener('submit', async(e)=>{
  e.preventDefault();
  const username = e.target.username.value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    body: `username=${encodeURIComponent(username)}`
  });

  const data = await res.json();
  console.log(data);
})

let pathName = document.getElementById('form').getAttribute('action');
const roomType = document.getElementById('options').value;
switch (roomType) {
  case "General":
    pathName = "/chatroom/general";
    break;
  case "Gaming":
    pathName = "/chatroom/gaming";
    break;
  case "Tech":
    pathName = "/chatroom/tech"
    break;
  default:
    pathName = "/chatroom/general";
    break;
}