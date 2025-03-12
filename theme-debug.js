/**
 * Script de depuración para el sistema de temas
 * Este script ayuda a identificar y corregir problemas con el cambio de tema
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Theme Debug: Script cargado")

  // Verificar el tema actual
  const currentTheme = localStorage.getItem("theme") || "light"
  console.log("Theme Debug: Tema actual en localStorage:", currentTheme)

  // Verificar si el elemento theme-style existe
  const themeStylesheet = document.getElementById("theme-style")
  if (themeStylesheet) {
    console.log("Theme Debug: Hoja de estilo del tema encontrada:", themeStylesheet.href)
  } else {
    console.error("Theme Debug: ¡No se encontró el elemento theme-style!")
  }

  // Verificar las clases en el body
  console.log("Theme Debug: Clases en el body:", document.body.className)

  // Verificar las variables CSS aplicadas
  const computedStyle = getComputedStyle(document.documentElement)
  console.log("Theme Debug: Variables CSS aplicadas:")
  console.log("--bg-color:", computedStyle.getPropertyValue("--bg-color"))
  console.log("--text-color:", computedStyle.getPropertyValue("--text-color"))
  console.log("--secondary-bg:", computedStyle.getPropertyValue("--secondary-bg"))

  // Añadir un botón de prueba para cambiar el tema manualmente
  const debugButton = document.createElement("button")
  debugButton.textContent = "Forzar cambio de tema"
  debugButton.style.position = "fixed"
  debugButton.style.bottom = "100px"
  debugButton.style.left = "20px"
  debugButton.style.zIndex = "9999"
  debugButton.style.padding = "10px"
  debugButton.style.backgroundColor = "#ff5722"
  debugButton.style.color = "white"
  debugButton.style.border = "none"
  debugButton.style.borderRadius = "4px"

  debugButton.addEventListener("click", () => {
    const newTheme = currentTheme === "light" ? "dark" : "light"
    console.log("Theme Debug: Cambiando manualmente al tema:", newTheme)

    // Cambiar la hoja de estilo
    if (themeStylesheet) {
      themeStylesheet.href = `https://jhproyectos.github.io/styles/${newTheme}-theme.css`
      console.log("Theme Debug: Hoja de estilo cambiada a:", themeStylesheet.href)
    }

    // Cambiar las clases del body
    if (newTheme === "dark") {
      document.body.classList.add("dark-theme")
      document.body.classList.remove("light-theme")
    } else {
      document.body.classList.add("light-theme")
      document.body.classList.remove("dark-theme")
    }

    console.log("Theme Debug: Clases actualizadas en el body:", document.body.className)

    // Guardar en localStorage
    localStorage.setItem("theme", newTheme)

    // Verificar las variables CSS después del cambio
    setTimeout(() => {
      const updatedStyle = getComputedStyle(document.documentElement)
      console.log("Theme Debug: Variables CSS después del cambio:")
      console.log("--bg-color:", updatedStyle.getPropertyValue("--bg-color"))
      console.log("--text-color:", updatedStyle.getPropertyValue("--text-color"))
      console.log("--secondary-bg:", updatedStyle.getPropertyValue("--secondary-bg"))
    }, 100)
  })

  document.body.appendChild(debugButton)
})

