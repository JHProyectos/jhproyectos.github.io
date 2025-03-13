document.addEventListener("DOMContentLoaded", () => {
  console.log("Main script loaded")

  // Cargar componentes
  loadComponent("header-container", "components/header.html")
  loadComponent("footer-container", "components/footer.html")
  loadComponent("floating-buttons-container", "components/floating-buttons.html")

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

// Función para cargar componentes HTML
function loadComponent(containerId, componentPath) {
  console.log(`Attempting to load component: ${containerId} from ${componentPath}`)

  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`Container #${containerId} not found in the document`)

    // Si el contenedor no existe, créalo para los botones flotantes
    if (containerId === "floating-buttons-container") {
      console.log("Creating floating buttons container")
      const floatingContainer = document.createElement("div")
      floatingContainer.id = "floating-buttons-container"
      document.body.appendChild(floatingContainer)

      fetch(componentPath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error loading ${componentPath}: ${response.status}`)
          }
          return response.text()
        })
        .then((html) => {
          floatingContainer.innerHTML = html
          console.log("Floating buttons loaded successfully")

          // Reinicializar los eventos después de cargar los botones
          initTheme()
        })
        .catch((error) => console.error("Error loading floating buttons:", error))
    }
    return
  }

  console.log(`Container #${containerId} found, fetching content from ${componentPath}`)

  fetch(componentPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error loading ${componentPath}: ${response.status}`)
      }
      return response.text()
    })
    .then((html) => {
      container.innerHTML = html
      console.log(`Component ${containerId} loaded successfully`)

      // Si es el header, inicializar la navegación activa
      if (containerId === "header-container") {
        setActiveNavLink()
      }

      // Si son los botones flotantes, reinicializar los eventos
      if (containerId === "floating-buttons-container") {
        initTheme()
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

    // Verificar si la ruta actual coincide con el enlace
    if (window.location.href === linkPath || (currentPath === "/" && linkPath.includes("index.html"))) {
      link.classList.add("active")
    }
  })
}

// Función para inicializar el tema
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle")
  if (!themeToggle) {
    console.warn("Theme toggle button not found")
    return // Salir si el botón no existe todavía
  }

  const themeStylesheet = document.getElementById("theme-style")
  const themeIcon = document.querySelector(".theme-toggle-icon")

  if (!themeStylesheet || !themeIcon) {
    console.warn("Theme stylesheet or icon not found")
    return
  }

  // Verificar si hay un tema guardado en localStorage
  const savedTheme = localStorage.getItem("theme") || "light"
  console.log(`Applying saved theme: ${savedTheme}`)

  // Aplicar tema guardado
  setTheme(savedTheme)

  // Evento para cambiar el tema
  themeToggle.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"

    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    console.log("Theme changed to:", newTheme)
  })

  // Función para establecer el tema
  function setTheme(theme) {
    // Cambiar la hoja de estilo
    if (theme === "dark") {
      themeStylesheet.href = "styles/dark-theme.css"
      themeIcon.textContent = "☀️"
      document.body.classList.add("dark-theme")
      document.body.classList.remove("light-theme")
    } else {
      themeStylesheet.href = "styles/light-theme.css"
      themeIcon.textContent = "🌙"
      document.body.classList.add("light-theme")
      document.body.classList.remove("dark-theme")
    }

    // Guardar el tema en localStorage
    localStorage.setItem("theme", theme)

    // Forzar la aplicación de los estilos
    document.documentElement.style.setProperty("--force-repaint", "true")
    setTimeout(() => {
      document.documentElement.style.removeProperty("--force-repaint")
    }, 10)

    // Aplicar el tema a todos los iframes (si existen)
    const iframes = document.querySelectorAll("iframe")
    iframes.forEach((iframe) => {
      try {
        if (iframe.contentDocument) {
          if (theme === "dark") {
            iframe.contentDocument.body.classList.add("dark-theme")
            iframe.contentDocument.body.classList.remove("light-theme")
          } else {
            iframe.contentDocument.body.classList.add("light-theme")
            iframe.contentDocument.body.classList.remove("dark-theme")
          }
        }
      } catch (e) {
        console.log("No se pudo acceder al iframe:", e)
      }
    })
  }
}

// Función para inicializar el menú móvil
function initMobileMenu() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("mobile-menu-button") || e.target.closest(".mobile-menu-button")) {
      const navMenu = document.querySelector(".nav-menu")
      if (navMenu) {
        navMenu.classList.toggle("active")
      }
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
  // Declarar AOS antes de usarlo
  let AOS

  // Verificar si AOS está disponible
  if (typeof AOS !== "undefined") {
    AOS = window.AOS // Asignar la variable global AOS a la variable local
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      disable: "mobile", // Deshabilitar en móviles para mejor rendimiento
    })
    console.log("AOS initialized")
  } else {
    console.log("AOS not available")
  }
}

// Función para inicializar contadores
function initCounters() {
  // Implementa la lógica de inicialización de contadores aquí
  console.log("Counters initialized")
}

