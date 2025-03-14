/**
 * Protección avanzada de imágenes - Técnica de mosaico
 * Esta técnica divide la imagen en múltiples partes y las muestra como un mosaico
 * Esto hace que sea mucho más difícil descargar la imagen completa
 */

document.addEventListener("DOMContentLoaded", () => {
  // Aplicar protección avanzada a imágenes seleccionadas
  const imagesToProtect = document.querySelectorAll(".service-detail-image, .portfolio-main-image")

  imagesToProtect.forEach((img) => {
    // Esperar a que la imagen se cargue
    if (img.complete) {
      applyMosaicProtection(img)
    } else {
      img.onload = () => {
        applyMosaicProtection(img)
      }
    }
  })
})

function applyMosaicProtection(img) {
  // Obtener dimensiones de la imagen
  const width = img.offsetWidth
  const height = img.offsetHeight

  // Crear un contenedor para el mosaico
  const mosaicContainer = document.createElement("div")
  mosaicContainer.className = "mosaic-container"
  mosaicContainer.style.width = width + "px"
  mosaicContainer.style.height = height + "px"
  mosaicContainer.style.position = "relative"

  // Número de piezas en el mosaico (más piezas = más difícil de reconstruir)
  const piecesX = 4
  const piecesY = 4

  // Tamaño de cada pieza
  const pieceWidth = width / piecesX
  const pieceHeight = height / piecesY

  // URL de la imagen original
  const imgUrl = img.src

  // Crear las piezas del mosaico
  for (let y = 0; y < piecesY; y++) {
    for (let x = 0; x < piecesX; x++) {
      const piece = document.createElement("div")
      piece.className = "mosaic-piece"
      piece.style.position = "absolute"
      piece.style.left = x * pieceWidth + "px"
      piece.style.top = y * pieceHeight + "px"
      piece.style.width = pieceWidth + "px"
      piece.style.height = pieceHeight + "px"
      piece.style.backgroundImage = `url(${imgUrl})`
      piece.style.backgroundPosition = `-${x * pieceWidth}px -${y * pieceHeight}px`
      piece.style.backgroundSize = `${width}px ${height}px`

      mosaicContainer.appendChild(piece)
    }
  }

  // Reemplazar la imagen original con el mosaico
  img.parentNode.replaceChild(mosaicContainer, img)

  // Añadir capa de protección sobre el mosaico
  const protectionLayer = document.createElement("div")
  protectionLayer.className = "image-protection-layer"
  mosaicContainer.appendChild(protectionLayer)

  // Añadir marca de agua
  const watermark = document.createElement("div")
  watermark.className = "watermark"
  watermark.textContent = "© JH Proyectos"
  mosaicContainer.appendChild(watermark)

  // Deshabilitar eventos de arrastrar en el mosaico
  mosaicContainer.addEventListener("dragstart", (e) => {
    e.preventDefault()
  })

  // Deshabilitar menú contextual en el mosaico
  mosaicContainer.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    alert("Esta imagen está protegida contra descarga.")
  })
}

