export function themeToggle(lightIcon, darkIcon, toggleBtn) {
  if (!lightIcon || !darkIcon || !toggleBtn) {
    console.log('Theme toggle: missing DOM elements', { lightIcon, darkIcon, toggleBtn });
    return;
  }

  // Set default theme if not set
  const html = document.documentElement;
  let theme = html.getAttribute("data-theme");
  if (!theme) {
    theme = "light";
    html.setAttribute("data-theme", theme);
  }

  function updateIcons(currentTheme) {
    if (currentTheme === "dark") {
      lightIcon.style.display = "none";
      darkIcon.style.display = "inline";
    } else {
      lightIcon.style.display = "inline";
      darkIcon.style.display = "none";
    }
  }

  updateIcons(theme);

  toggleBtn.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    updateIcons(newTheme);
    console.log('Theme toggled to', newTheme);
  });
}