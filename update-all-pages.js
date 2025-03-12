/**
 * Script para actualizar todas las páginas HTML con el favicon y el sistema de temas
 * Este script es solo para referencia y debe ejecutarse manualmente
 */

const fs = require("fs")
const path = require("path")

// Directorio raíz del proyecto
const rootDir = "./"

// Función para encontrar todos los archivos HTML en el proyecto
function findHtmlFiles(dir) {
  let results = []
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && file !== "node_modules" && file !== ".git") {
      // Recursivamente buscar en subdirectorios
      results = results.concat(findHtmlFiles(filePath))
    } else if (path.extname(file) === ".html") {
      // Añadir archivos HTML a los resultados
      results.push(filePath)
    }
  }

  return results
}

// Función para actualizar un archivo HTML
function updateHtmlFile(filePath) {
  console.log(`Actualizando: ${filePath}`)

  let content = fs.readFileSync(filePath, "utf8")

  // Verificar si ya tiene favicon
  const hasFavicon = content.includes('rel="icon"') || content.includes('rel="shortcut icon"')

  // Verificar si ya tiene el script de tema global
  const hasThemeScript = content.includes("theme-global.js")

  // Verificar si ya tiene la clase light-theme en el body
  const hasLightThemeClass = content.includes('class="light-theme"') || content.includes("class='light-theme'")

  // Preparar las modificaciones
  if (!hasFavicon) {
    // Añadir favicon después de las meta tags
    const faviconTags = `   <!-- Favicon -->
   <link rel="icon" href="https://jhproyectos.github.io/images/logo-2.jpg" type="image/jpeg">
   <link rel="shortcut icon" href="https://jhproyectos.github.io/images/logo-2.jpg" type="image/jpeg">`

    // Insertar después de la última meta tag o antes del primer link
    if (content.includes("</title>")) {
      content = content.replace("</title>", "</title>\n" + faviconTags)
    } else if (content.includes("<link")) {
      content = content.replace("<link", faviconTags + "\n   <link")
    }
  }

  if (!hasThemeScript) {
    // Añadir script de tema global antes de otros scripts
    const themeScriptTag = `   <script src="https://jhproyectos.github.io/scripts/theme-global.js" defer></script>`

    if (content.includes("<script")) {
      content = content.replace("<script", themeScriptTag + "\n   <script")
    } else if (content.includes("</head>")) {
      content = content.replace("</head>", themeScriptTag + "\n</head>")
    }
  }

  // Añadir enlace a theme-fix.css si no existe
  if (!content.includes("theme-fix.css")) {
    const themeCssTag = `   <link rel="stylesheet" href="https://jhproyectos.github.io/styles/theme-fix.css">`

    if (content.includes('id="theme-style"')) {
      // Insertar después del tema principal
      content = content.replace('id="theme-style">', 'id="theme-style">\n' + themeCssTag)
    } else if (content.includes("<link")) {
      // Insertar después del último link
      const lastLinkIndex = content.lastIndexOf("<link")
      const endOfLinkTag = content.indexOf(">", lastLinkIndex) + 1
      content = content.slice(0, endOfLinkTag) + "\n" + themeCssTag + content.slice(endOfLinkTag)
    }
  }

  if (!hasLightThemeClass && content.includes("<body")) {
    // Añadir clase light-theme al body
    content = content.replace("<body", '<body class="light-theme"')
  }

  // Guardar los cambios
  fs.writeFileSync(filePath, content, "utf8")
  console.log(`Actualizado: ${filePath}`)
}

// Función principal
function updateAllPages() {
  console.log("Iniciando actualización de todas las páginas HTML...")

  // Encontrar todos los archivos HTML
  const htmlFiles = findHtmlFiles(rootDir)
  console.log(`Se encontraron ${htmlFiles.length} archivos HTML.`)

  // Actualizar cada archivo
  for (const file of htmlFiles) {
    updateHtmlFile(file)
  }

  console.log("Actualización completada.")
}

// Ejecutar la función principal
updateAllPages()

