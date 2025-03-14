document.addEventListener("DOMContentLoaded", () => {
  console.log("Iniciando carga de componentes...");

  // Cargar componentes con Promise.all para esperar a que todos terminen
  Promise.all([
      loadComponent("header-container", "components/header.html");
      loadComponent("footer-container", "components/footer.html");
      loadComponent("floating-buttons-container", "components/floating-buttons.html");
  ])
    .then(() => {
      console.log("Componentes cargados exitosamente");
      // Inicializar funcionalidades solo después de cargar componentes
      initTheme();
      initMobileMenu();
      handleOrientation();
      initScrollAnimations();
      initCounters();
    })
    .catch((error) => {
      console.error("Error al cargar componentes:", error);
      // Mostrar mensaje al usuario
      document.body.innerHTML += `<div class="error-message">Error cargando la página. Por favor, recarga.</div>`;
    });
});

// Función para cargar componentes HTML
function loadComponent(containerId, componentPath) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Contenedor ${containerId} no encontrado`);
    return Promise.resolve(); // Evita que Promise.all falle
  }

  return fetch(componentPath)
    .then((response) => {
      if (!response.ok) throw new Error(`Error ${response.status} al cargar ${componentPath}`);
      return response.text();
    })
    .then((html) => {
      container.innerHTML = html;
      if (containerId === "header-container") setActiveNavLink();
      console.log(`${containerId} cargado desde ${componentPath}`);
    })
    .catch((error) => {
      console.error(`Error cargando ${containerId}:`, error);
      container.innerHTML = `<div class="error-message">Error al cargar el componente.</div>`;
    });
}

// Función para establecer el enlace de navegación activo
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link") || [];
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (window.location.href === linkPath || (currentPath === "/" && linkPath.includes("index.html"))) {
      link.classList.add("active");
    }
  });
}

// Función para inicializar el tema
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeStylesheet = document.getElementById("theme-style");
  const themeIcon = document.querySelector(".theme-toggle-icon");

  if (!themeToggle || !themeStylesheet || !themeIcon) {
    console.warn("Elementos de tema no encontrados");
    return;
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  });

  function setTheme(theme) {
    themeStylesheet.href = `https://jhproyectos.github.io/styles/${theme}-theme.css`;
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.body.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("theme", theme);
    console.log("Tema aplicado:", theme);
  }
}

// Función para inicializar el menú móvil
function initMobileMenu() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".mobile-menu-button")) {
      const navMenu = document.querySelector(".nav-menu");
      if (navMenu) navMenu.classList.toggle("active");
    }
  });
}

// Función para manejar cambios de orientación
function handleOrientation() {
  const checkOrientation = () => {
    if (window.innerHeight > window.innerWidth) {
      document.body.classList.add("portrait");
      document.body.classList.remove("landscape");
    } else {
      document.body.classList.add("landscape");
      document.body.classList.remove("portrait");
    }
  };
  checkOrientation();
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);
}

// Función para inicializar animaciones de scroll
function initScrollAnimations() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      disable: "mobile",
    });
    console.log("AOS inicializado");
  } else {
    console.warn("AOS no está disponible");
  }
}

// Función para inicializar contadores
function initCounters() {
  console.log("Contadores inicializados");
  // Agregar lógica si es necesario
}
