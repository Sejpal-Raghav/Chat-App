import config from './config/config.js';

import { themeToggle } from "./utils/themeToggle.js";
const toggleBtn = document.getElementById("theme-toggle");
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");
themeToggle(lightIcon, darkIcon, toggleBtn);
const privateChatRoomButton = document.getElementById("here_privateChatRoom");

privateChatRoomButton.addEventListener("click", () => {
  const roomId = function getRandomInt(min, max) {
    min = 123456;
    max = 943987;
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
  window.location.href = "/privateChat/id=" + roomId.toString();
})

loginButton.addEventListener('click', async (event) => {
  event.preventDefault();
  console.log('Login button clicked');

  const username = document.getElementById('UserInput').value;
  const data = new URLSearchParams();
  data.append('username', username);

  try {
    const res = await fetch(`${config.apiUrl}/chatPage`, {
      method: 'POST',
      body: data
    });

    const result = await res.json();
    console.log('Response:', result);

    sessionStorage.setItem('username', result.user);
    if (result.success) {
      window.location.href = '/chatPage';
    } else {
      alert('Login failed');
    }
  } catch (err) {
    console.error('Error during fetch:', err);
    alert('Something went wrong. See console.');
  }
});