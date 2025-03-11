document.addEventListener("DOMContentLoaded", () => {
  // Inicializar idioma
  initLanguage()
})

// Función para inicializar el idioma
function initLanguage() {
  // Verificar si hay un idioma guardado en localStorage
  const savedLang = localStorage.getItem("language") || "es"

  // Cargar traducciones
  loadTranslations(savedLang)

  // Evento para cambiar el idioma (botones en el header)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("lang-button") || e.target.closest(".lang-button")) {
      const lang = e.target.dataset.lang || e.target.closest(".lang-button").dataset.lang
      setLanguage(lang)
    }

    // Botón móvil de idioma
    if (e.target.id === "lang-toggle-mobile" || e.target.closest("#lang-toggle-mobile")) {
      const currentLang = localStorage.getItem("language") || "es"
      const newLang = currentLang === "es" ? "en" : "es"
      setLanguage(newLang)
    }
  })
}

// Función para cargar traducciones
function loadTranslations(lang) {
  fetch(`/lang/${lang}.json`)
    .then((response) => response.json())
    .then((translations) => {
      // Aplicar traducciones a todos los elementos con data-lang-key
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

