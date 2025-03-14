// Configuración base
const BASE_URL = "https://jhproyectos.github.io"

document.addEventListener("DOMContentLoaded", () => {
  console.log("Iniciando carga de componentes...")

  // Verificar que estamos en el dominio correcto
  const currentDomain = window.location.hostname
  console.log("Dominio actual:", currentDomain)

  // Cargar componentes con manejo de errores mejorado
  Promise.all([
    loadComponent("header-container", `${BASE_URL}/components/header.html`),
    loadComponent("footer-container", `${BASE_URL}/components/footer.html`),
    loadComponent("floating-buttons-container", `${BASE_URL}/components/floating-buttons.html`),
  ])
    .then(() => {
      console.log("Todos los componentes cargados correctamente")
      // Inicializar funcionalidades después de cargar componentes
      initTheme()
      initMobileMenu()
      handleOrientation()
      initScrollAnimations()
      initCounters()
    })
    .catch((error) => {
      console.error("Error cargando componentes:", error)
    })
})

// Función mejorada para cargar componentes
async function loadComponent(containerId, componentPath) {
  console.log(`Intentando cargar ${containerId} desde ${componentPath}`)

  try {
    // Verificar/crear contenedor
    let container = document.getElementById(containerId)
    if (!container) {
      console.log(`Creando contenedor para ${containerId}`)
      container = document.createElement("div")
      container.id = containerId
      document.body.appendChild(container)
    }

    // Cargar componente
    const response = await fetch(componentPath)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    container.innerHTML = html
    console.log(`Componente ${containerId} cargado exitosamente`)

    // Inicializaciones específicas post-carga
    if (containerId === "header-container") {
      setActiveNavLink()
    } else if (containerId === "floating-buttons-container") {
      initTheme()
    }

    return true
  } catch (error) {
    console.error(`Error cargando ${containerId}:`, error)
    // Mostrar mensaje de error al usuario
    const container = document.getElementById(containerId)
    if (container) {
      container.innerHTML = `
        <div style="padding: 1rem; background-color: #fee; color: #c00; border: 1px solid #fcc;">
          Error cargando componente. Por favor, recarga la página.
        </div>
      `
    }
    throw error
  }
}

// Resto de funciones actualizadas con mejor manejo de errores...
function setActiveNavLink() {
  try {
    const currentPath = window.location.pathname
    const navLinks = document.querySelectorAll(".nav-link")

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute("href")
      if (window.location.href === linkPath || (currentPath === "/" && linkPath.includes("index.html"))) {
        link.classList.add("active")
      }
    })
  } catch (error) {
    console.error("Error en setActiveNavLink:", error)
  }
}

function initTheme() {
  try {
    const themeToggle = document.getElementById("theme-toggle")
    if (!themeToggle) {
      console.warn("Botón de tema no encontrado")
      return
    }

    const themeStylesheet = document.getElementById("theme-style")
    const themeIcon = document.querySelector(".theme-toggle-icon")

    if (!themeStylesheet || !themeIcon) {
      console.warn("Elementos de tema no encontrados")
      return
    }

    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)

    themeToggle.addEventListener("click", () => {
      const currentTheme = localStorage.getItem("theme") || "light"
      const newTheme = currentTheme === "light" ? "dark" : "light"
      setTheme(newTheme)
    })
  } catch (error) {
    console.error("Error en initTheme:", error)
  }
}

function setTheme(theme) {
  try {
    const themeStylesheet = document.getElementById("theme-style")
    const themeIcon = document.querySelector(".theme-toggle-icon")

    if (theme === "dark") {
      themeStylesheet.href = `${BASE_URL}/styles/dark-theme.css`
      themeIcon.textContent = "☀️"
      document.body.classList.add("dark-theme")
      document.body.classList.remove("light-theme")
    } else {
      themeStylesheet.href = `${BASE_URL}/styles/light-theme.css`
      themeIcon.textContent = "🌙"
      document.body.classList.add("light-theme")
      document.body.classList.remove("dark-theme")
    }

    localStorage.setItem("theme", theme)
    console.log("Tema aplicado:", theme)
  } catch (error) {
    console.error("Error aplicando tema:", error)
  }
}

function initMobileMenu() {
  try {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("mobile-menu-button") || e.target.closest(".mobile-menu-button")) {
        const navMenu = document.querySelector(".nav-menu")
        if (navMenu) {
          navMenu.classList.toggle("active")
        }
      }
    })
  } catch (error) {
    console.error("Error en initMobileMenu:", error)
  }
}

function handleOrientation() {
  try {
    const checkOrientation = () => {
      if (window.innerHeight > window.innerWidth) {
        document.body.classList.add("portrait")
        document.body.classList.remove("landscape")
      } else {
        document.body.classList.add("landscape")
        document.body.classList.remove("portrait")
      }
    }

    checkOrientation()
    window.addEventListener("resize", checkOrientation)
    window.addEventListener("orientationchange", checkOrientation)
  } catch (error) {
    console.error("Error en handleOrientation:", error)
  }
}

let AOS // Declare AOS here

function initScrollAnimations() {
  try {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out",
        once: true,
        disable: "mobile",
      })
      console.log("AOS inicializado")
    } else {
      console.warn("AOS no disponible")
    }
  } catch (error) {
    console.error("Error inicializando AOS:", error)
  }
}

function initCounters() {
  try {
    console.log("Contadores inicializados")
  } catch (error) {
    console.error("Error en initCounters:", error)
  }
}

