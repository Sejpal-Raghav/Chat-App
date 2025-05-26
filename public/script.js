const toggleBtn = document.getElementById("theme-toggle");
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");
const loginButton = document.getElementById("loginButton");
const privateChatRoomButton = document.getElementById("here_privateChatRoom");

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

loginButton.addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim()
  const data = new URLSearchParams()
  data.append('username', username)

  const res = await fetch('/chatPage', {
    method: 'POST',
    body: data
  })

  const result = await res.json()

  if (result.success) {
    localStorage.setItem('username', result.user)
    window.location.href = '/chatPage'
  } else {
    alert('Login failed')
  }
})