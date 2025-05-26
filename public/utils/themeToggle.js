export function themeToggle(lightIcon, darkIcon, toggleBtn) {

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
}