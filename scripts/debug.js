// Script de depuración mejorado
document.addEventListener("DOMContentLoaded", () => {
  console.group("🔍 Diagnóstico de carga")
  console.log("DOM cargado")

  // Verificar entorno
  console.log("URL actual:", window.location.href)
  console.log("Hostname:", window.location.hostname)
  console.log("Pathname:", window.location.pathname)

  // Verificar contenedores
  const containers = ["header-container", "footer-container", "floating-buttons-container"]
  containers.forEach((id) => {
    const element = document.getElementById(id)
    console.log(`Contenedor ${id}:`, element ? "✅ Encontrado" : "❌ No encontrado")
  })

  // Verificar recursos críticos
  const criticalResources = [
    "/styles/main.css",
    "/styles/light-theme.css",
    "/styles/dark-theme.css",
    "/components/header.html",
    "/components/footer.html",
    "/components/floating-buttons.html",
  ]

  criticalResources.forEach((resource) => {
    fetch(`https://jhproyectos.github.io${resource}`)
      .then((response) => {
        console.log(`Recurso ${resource}:`, response.ok ? "✅ Accesible" : "❌ No accesible")
      })
      .catch((error) => {
        console.error(`Error accediendo a ${resource}:`, error)
      })
  })

  // Verificar scripts
  const scripts = document.querySelectorAll("script")
  console.log("Scripts cargados:", scripts.length)
  scripts.forEach((script) => {
    console.log("Script:", script.src || "inline")
  })

  // Verificar estilos
  const styles = document.querySelectorAll("link[rel='stylesheet']")
  console.log("Hojas de estilo cargadas:", styles.length)
  styles.forEach((style) => {
    console.log("Estilo:", style.href)
  })

  console.groupEnd()

  // Monitorear cambios en el DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        console.log("Cambio en el DOM detectado:", {
          addedNodes: mutation.addedNodes.length,
          removedNodes: mutation.removedNodes.length,
          target: mutation.target.id || mutation.target.className || "unknown",
        })
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
})

// Función para probar manualmente la carga de componentes
window.testLoadComponent = async (containerId) => {
  console.group(`🧪 Prueba de carga: ${containerId}`)

  try {
    // Assuming loadComponent is defined elsewhere or needs to be mocked for debugging
    const loadComponent = async (containerId, url) => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          console.error(`Error fetching ${url}: ${response.status}`)
          return false
        }
        const html = await response.text()
        const container = document.getElementById(containerId)
        if (container) {
          container.innerHTML = html
          return true
        } else {
          console.error(`Container ${containerId} not found.`)
          return false
        }
      } catch (error) {
        console.error(`Error loading component ${containerId}:`, error)
        return false
      }
    }

    const BASE_URL = "https://jhproyectos.github.io"
    const result = await loadComponent(containerId, `${BASE_URL}/components/${containerId}.html`)
    console.log("Resultado:", result ? "✅ Éxito" : "❌ Fallo")
  } catch (error) {
    console.error("Error en prueba:", error)
  }

  console.groupEnd()
}

// Función para verificar el estado del tema
window.checkThemeState = () => {
  console.group("🎨 Estado del tema")

  console.log("Tema en localStorage:", localStorage.getItem("theme"))
  console.log("Clase en body:", document.body.className)
  console.log("Hoja de estilo actual:", document.getElementById("theme-style")?.href)

  console.groupEnd()
}

