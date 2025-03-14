document.addEventListener("DOMContentLoaded", () => {
  // Aplicar protección a todas las imágenes del sitio
  applyImageProtection()
})

function applyImageProtection() {
  // Seleccionar todas las imágenes que queremos proteger
  // Puedes ajustar este selector para aplicarlo solo a ciertas imágenes
  const images = document.querySelectorAll(
    ".service-image, .service-detail-image, .portfolio-main-image, .thumbnail, .responsive-image",
  )

  images.forEach((img) => {
    // 1. Envolver cada imagen en un contenedor div
    const wrapper = document.createElement("div")
    wrapper.className = "protected-image-wrapper"

    // Obtener el padre original de la imagen
    const parent = img.parentNode

    // Reemplazar la imagen con el wrapper
    parent.replaceChild(wrapper, img)

    // Añadir la imagen al wrapper
    wrapper.appendChild(img)

    // 2. Crear una capa de protección sobre la imagen
    const protectionLayer = document.createElement("div")
    protectionLayer.className = "image-protection-layer"
    wrapper.appendChild(protectionLayer)

    // 3. Añadir atributos de protección a la imagen
    img.setAttribute("draggable", "false")
    img.style.pointerEvents = "none"

    // 4. Opcional: Añadir marca de agua con CSS
    // Esto se hace en el CSS
  })

  // 5. Deshabilitar el menú contextual (clic derecho) en todo el documento
  document.addEventListener("contextmenu", (e) => {
    // Solo prevenir en imágenes protegidas
    if (e.target.closest(".protected-image-wrapper")) {
      e.preventDefault()

      // Opcional: Mostrar un mensaje personalizado
      alert("Las imágenes de este sitio están protegidas contra descarga.")
    }
  })

  // 6. Deshabilitar atajos de teclado comunes para guardar imágenes
  document.addEventListener("keydown", (e) => {
    // Ctrl+S, Ctrl+U, F12, etc.
    if (
      (e.ctrlKey && (e.key === "s" || e.key === "S" || e.key === "u" || e.key === "U")) ||
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "i" || e.key === "I"))
    ) {
      e.preventDefault()
    }
  })

  // 7. Interceptar el evento de arrastrar para imágenes protegidas
  document.addEventListener("dragstart", (e) => {
    if (e.target.closest(".protected-image-wrapper")) {
      e.preventDefault()
    }
  })
}

