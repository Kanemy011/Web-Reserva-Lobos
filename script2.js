let barra = document.getElementsByClassName("navbar")[0];
const parallaxWrapper = document.querySelector('.parallax_wrapper');

// Función para manejar los cambios de estilo en la barra
function updateNavbarStyle() {
    if (window.innerWidth < 992) {
        barra.classList.add('scrolled'); // Agrega la clase que cambia el fondo
        console.log("Estoy cambiando el color de la barra a scrolled (pantalla pequeña)");
        
        // Elimina el evento de scroll si estaba agregado
        parallaxWrapper.removeEventListener('scroll', handleScroll);
    } else {
        barra.classList.remove('scrolled'); // Elimina la clase cuando está por encima del umbral
        // Agrega el evento de scroll de nuevo
        parallaxWrapper.addEventListener('scroll', handleScroll);
    }
}

// Función para manejar el scroll en el contenedor parallax
function handleScroll() {
    let scrollPos = parallaxWrapper.scrollTop;
    let scrollTrigger = 400;

    if (scrollPos > scrollTrigger) {
        barra.classList.add('scrolled'); // Agrega la clase que cambia el fondo
        console.log("Estoy cambiando el color de la barra por scroll");
    } else {
        barra.classList.remove('scrolled'); // Elimina la clase cuando está por encima del umbral
    }
}

// Inicializar estilos y eventos
function init() {
    // Actualizar el estilo de la barra al cargar
    updateNavbarStyle();
    
    // Escuchar el evento de resize
    window.addEventListener('resize', updateNavbarStyle);

    // Agregar el evento de scroll solo si es grande
    if (window.innerWidth >= 992) {
        parallaxWrapper.addEventListener('scroll', handleScroll);
    }
}

// Ejecutar la función de inicialización
init();

console.log("JavaScript enlazado correctamente.");
