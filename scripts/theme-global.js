/**
 * Script global para manejar el tema en todas las páginas
 * Este script debe incluirse en todas las páginas HTML
 */

document.addEventListener("DOMContentLoaded", () => {
  // Aplicar el tema guardado inmediatamente al cargar la página
  applyThemeFromStorage()
})

function applyThemeFromStorage() {
  const savedTheme = localStorage.getItem("theme") || "light"
  const themeStylesheet = document.getElementById("theme-style")
  const themeIcon = document.querySelector(".theme-toggle-icon")

  if (!themeStylesheet || !themeIcon) {
    console.error("Elementos de tema no encontrados")
    return
  }

  // Aplicar el tema según lo guardado en localStorage
  if (savedTheme === "dark") {
    themeStylesheet.href = "https://jhproyectos.github.io/styles/dark-theme.css"
    themeIcon.textContent = "☀️"
    document.body.classList.add("dark-theme")
    document.body.classList.remove("light-theme")
  } else {
    themeStylesheet.href = "https://jhproyectos.github.io/styles/light-theme.css"
    themeIcon.textContent = "🌙"
    document.body.classList.add("light-theme")
    document.body.classList.remove("dark-theme")
  }

  console.log("Tema aplicado desde localStorage:", savedTheme)
}

