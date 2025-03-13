// Script principal con carga dinámica de componentes
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script principal cargado")

  // Determinar la ruta base según si estamos en una página principal o secundaria
  const isSubPage = window.location.pathname.includes("/pages/")
  const basePath = isSubPage ? "../" : "./"

  console.log("Ruta base detectada:", basePath)

  // Cargar componentes dinámicamente
  Promise.all([
    loadComponent("header-container", `${basePath}components/header.html`),
    loadComponent("footer-container", `${basePath}components/footer.html`),
    loadComponent("floating-buttons-container", `${basePath}components/floating-buttons.html`),
  ])
    .then(() => {
      console.log("Todos los componentes cargados correctamente")
      // Inicializar funcionalidades después de cargar componentes
      initTheme()
      initMobileMenu()
      handleOrientation()
      initScrollAnimations()
      initLanguage()
    })
    .catch((error) => {
      console.error("Error cargando componentes:", error)
      // Mostrar mensaje de error al usuario
      showErrorMessage("Hubo un problema cargando la página. Por favor, recarga.")
    })
})

// Función para cargar componentes dinámicamente
async function loadComponent(containerId, componentPath) {
  console.log(`Intentando cargar ${containerId} desde ${componentPath}`)

  try {
    // Verificar si el contenedor existe
    const container = document.getElementById(containerId)
    if (!container) {
      console.error(`Contenedor #${containerId} no encontrado`)
      return false
    }

    // Mostrar indicador de carga
    container.innerHTML = '<div class="loading-indicator">Cargando...</div>'

    // Cargar el componente
    const response = await fetch(componentPath)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const html = await response.text()
    container.innerHTML = html
    console.log(`Componente ${containerId} cargado exitosamente`)

    // Inicializaciones específicas post-carga
    if (containerId === "header-container") {
      setActiveNavLink()
    }

    return true
  } catch (error) {
    console.error(`Error cargando ${containerId}:`, error)
    document.getElementById(containerId).innerHTML =
      `<div class="error-message">Error cargando componente. <button onclick="retryLoadComponent('${containerId}', '${componentPath}')">Reintentar</button></div>`
    return false
  }
}

// Función para reintentar la carga de un componente
window.retryLoadComponent = (containerId, componentPath) => {
  loadComponent(containerId, componentPath)
}

// Función para mostrar mensaje de error
function showErrorMessage(message) {
  const errorDiv = document.createElement("div")
  errorDiv.className = "global-error"
  errorDiv.innerHTML = `
   <div class="error-content">
     <p>${message}</p>
     <button onclick="window.location.reload()">Recargar página</button>
   </div>
 `
  document.body.appendChild(errorDiv)
}

// Función para establecer el enlace de navegación activo
function setActiveNavLink() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    // Verificar si la ruta actual coincide con el enlace
    if (
      currentPath.endsWith(href) ||
      (currentPath.endsWith("/") && href.includes("index.html")) ||
      (currentPath.endsWith("index.html") && href.includes("index.html"))
    ) {
      link.classList.add("active")
    }
  })
}

// Función para inicializar el tema
function initTheme() {
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

  // Verificar si hay un tema guardado en localStorage
  const savedTheme = localStorage.getItem("theme") || "light"
  console.log(`Aplicando tema guardado: ${savedTheme}`)

  // Aplicar tema guardado
  setTheme(savedTheme)

  // Evento para cambiar el tema
  themeToggle.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"
    setTheme(newTheme)
  })
}

// Función para establecer el tema
function setTheme(theme) {
  try {
    const themeStylesheet = document.getElementById("theme-style")
    const themeIcon = document.querySelector(".theme-toggle-icon")

    // Determinar la ruta base
    const isSubPage = window.location.pathname.includes("/pages/")
    const basePath = isSubPage ? "../" : "./"

    if (theme === "dark") {
      themeStylesheet.href = `${basePath}styles/dark-theme.css`
      themeIcon.textContent = "☀️"
      document.body.classList.add("dark-theme")
      document.body.classList.remove("light-theme")
      document.documentElement.classList.add("dark-theme")
    } else {
      themeStylesheet.href = `${basePath}styles/light-theme.css`
      themeIcon.textContent = "🌙"
      document.body.classList.add("light-theme")
      document.body.classList.remove("dark-theme")
      document.documentElement.classList.remove("dark-theme")
    }

    localStorage.setItem("theme", theme)
    console.log("Tema aplicado:", theme)
  } catch (error) {
    console.error("Error aplicando tema:", error)
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

  checkOrientation()
  window.addEventListener("resize", checkOrientation)
  window.addEventListener("orientationchange", checkOrientation)
}

// Función para inicializar animaciones de scroll
let AOS // Declare AOS here
function initScrollAnimations() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      disable: "mobile",
    })
    console.log("AOS inicializado")
  } else {
    console.log("AOS no disponible")
  }
}

// Función para inicializar el sistema de idiomas
function initLanguage() {
  // Cargar el idioma guardado
  const savedLang = localStorage.getItem("language") || "es"
  loadTranslations(savedLang)

  // Eventos para cambiar idioma
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("lang-button") || e.target.closest(".lang-button")) {
      const lang = e.target.dataset.lang || e.target.closest(".lang-button").dataset.lang
      setLanguage(lang)
    }

    if (e.target.id === "lang-toggle-mobile" || e.target.closest("#lang-toggle-mobile")) {
      const currentLang = localStorage.getItem("language") || "es"
      const newLang = currentLang === "es" ? "en" : "es"
      setLanguage(newLang)
    }
  })
}

// Función para cargar traducciones
function loadTranslations(lang) {
  // Determinar la ruta base
  const isSubPage = window.location.pathname.includes("/pages/")
  const basePath = isSubPage ? "../" : "./"

  fetch(`${basePath}lang/${lang}.json`)
    .then((response) => response.json())
    .then((translations) => {
      // Aplicar traducciones
      const elements = document.querySelectorAll("[data-lang-key]")
      elements.forEach((element) => {
        const key = element.dataset.langKey
        if (translations[key]) {
          // Si el elemento es un input con placeholder
          if (element.placeholder !== undefined) {
            element.placeholder = translations[key]
          }
          // Si es un elemento normal
          else {
            element.textContent = translations[key]
          }
        }
      })

      // Actualizar el atributo lang del HTML
      document.documentElement.lang = lang

      // Actualizar botones de idioma
      updateLanguageButtons(lang)
    })
    .catch((error) => console.error("Error loading translations:", error))
}

// Función para establecer el idioma
function setLanguage(lang) {
  loadTranslations(lang)
  localStorage.setItem("language", lang)
}

// Función para actualizar los botones de idioma
function updateLanguageButtons(activeLang) {
  const langButtons = document.querySelectorAll(".lang-button")
  langButtons.forEach((button) => {
    if (button.dataset.lang === activeLang) {
      button.classList.add("active")
    } else {
      button.classList.remove("active")
    }
  })
}
```  {
     button.classList.add("active")
   } else {
     button.classList.remove("active")
   }
 })
}

