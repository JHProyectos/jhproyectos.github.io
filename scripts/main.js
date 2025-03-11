document.addEventListener("DOMContentLoaded", () => {
  // Determinar la ruta base para cargar componentes
  const basePath = getBasePath()

  // Cargar componentes
  loadComponent("header-container", `${basePath}components/header.html`)
  loadComponent("footer-container", `${basePath}components/footer.html`)

  // Inicializar tema
  initTheme()

  // Inicializar menú móvil
  initMobileMenu()

  // Manejar orientación
  handleOrientation()

  // Inicializar animaciones de scroll
  initScrollAnimations()

  // Inicializar contadores
  initCounters()
})

// Función para determinar la ruta base
function getBasePath() {
  const path = window.location.pathname
  // Si estamos en una subcarpeta (como /pages/), necesitamos volver a la raíz
  if (path.includes("/pages/")) {
    return "../"
  }
  // Si estamos en la raíz
  return ""
}

// Función para cargar componentes HTML
function loadComponent(containerId, componentPath) {
  const container = document.getElementById(containerId)
  if (!container) return

  fetch(componentPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.text()
    })
    .then((html) => {
      container.innerHTML = html

      // Si es el header, inicializar la navegación activa
      if (containerId === "header-container") {
        setActiveNavLink()
      }
    })
    .catch((error) => console.error(`Error loading component ${componentPath}:`, error))
}

// Función para establecer el enlace de navegación activo
function setActiveNavLink() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")

    // Extraer el nombre del archivo de la ruta actual
    const currentFile = currentPath.split("/").pop()

    // Extraer el nombre del archivo del enlace
    const linkFile = linkPath.split("/").pop()

    // Verificar si la ruta actual coincide con el enlace
    if (currentFile === linkFile || (currentPath.endsWith("/") && linkPath.includes("index.html"))) {
      link.classList.add("active")
    }
  })
}

// Función para inicializar el tema
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle")
  const themeStylesheet = document.getElementById("theme-style")
  const themeIcon = document.querySelector(".theme-toggle-icon")
  const basePath = getBasePath()

  // Verificar si hay un tema guardado en localStorage
  const savedTheme = localStorage.getItem("theme") || "light"

  // Aplicar tema guardado
  setTheme(savedTheme)

  // Evento para cambiar el tema
  themeToggle.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"

    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  })

  // Función para establecer el tema
  function setTheme(theme) {
    if (theme === "dark") {
      themeStylesheet.href = `${basePath}styles/dark-theme.css`
      themeIcon.textContent = "☀️"
    } else {
      themeStylesheet.href = `${basePath}styles/light-theme.css`
      themeIcon.textContent = "🌙"
    }
    localStorage.setItem("theme", theme)
  }
}

// Función para inicializar el menú móvil
function initMobileMenu() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("mobile-menu-button") || e.target.closest(".mobile-menu-button")) {
      const navMenu = document.querySelector(".nav-menu")
      navMenu.classList.toggle("active")
    }
  })
}

// Función para manejar cambios de orientación
function handleOrientation() {
  const checkOrientation = () => {
    if (window.innerHeight > window.innerWidth) {
      document.body.classList.add("portrait")
      document.body.classList.remove("landscape")
    } else {
      document.body.classList.add("landscape")
      document.body.classList.remove("portrait")
    }
  }

  // Comprobar orientación inicial
  checkOrientation()

  // Escuchar cambios de orientación
  window.addEventListener("resize", checkOrientation)
  window.addEventListener("orientationchange", checkOrientation)
}

// Función para inicializar animaciones de scroll
function initScrollAnimations() {
  // Implementa la lógica de inicialización de animaciones de scroll aquí
  console.log("Scroll animations initialized")
}

// Función para inicializar contadores
function initCounters() {
  // Implementa la lógica de inicialización de contadores aquí
  console.log("Counters initialized")
}

