const toggleBtn = document.getElementById("theme-toggle");
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");

toggleBtn.addEventListener("click", () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme") || "light";
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
