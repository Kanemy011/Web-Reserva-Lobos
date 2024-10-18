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

//QUIZ

// Array con los nombres de los archivos HTML de las preguntas y otros pasos del quiz
// const paginasQuiz = [
//     'quiz/quiz.html',
//     'quiz/q1.html',
//     'quiz/q2.html',
//     'quiz/q3.html',
//     'quiz/q4.html',
//     'quiz/q5.html',
//     'quiz/q6.html',
//     'quiz/results.html', // Página antes de los resultados
//     'quiz/no.html',
//     'quiz/maybe.html',
//     'quiz/yes.html'
// ];

// let paginaActual = 0; // Índice de la página actual
// const quizContainer = document.getElementById('quiz-container'); // Contenedor del quiz

// // Función para cargar dinámicamente una página HTML en el contenedor
// function cargarPagina(index) {
//     if (index >= 0 && index < paginasQuiz.length) {
//         fetch(paginasQuiz[index]) // Hacemos la petición fetch para cargar el archivo HTML correspondiente
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Error al cargar la página: ' + response.statusText);
//                 }
//                 return response.text(); // Convertimos la respuesta a texto (HTML)
//             })
//             .then(data => {
//                 quizContainer.innerHTML = data; // Insertamos el contenido HTML dentro del contenedor
//                 // Aquí puedes ejecutar funciones adicionales si es necesario después de cargar cada página
//             })
//             .catch(error => {
//                 console.error('Error al cargar la página:', error);
//             });
//     }
// }

// // Función para avanzar a la siguiente página del quiz
// function avanzar() {
//     if (paginaActual < paginasQuiz.length - 1) {
//         paginaActual++;
//         cargarPagina(paginaActual); // Cargar la siguiente página
//     }
// }

// // Función para retroceder a la página anterior (si es necesario)
// function retroceder() {
//     if (paginaActual > 0) {
//         paginaActual--;
//         cargarPagina(paginaActual); // Cargar la página anterior
//     }
// }

// // Inicializamos cargando la primera página del quiz
// cargarPagina(paginaActual);




// Array con los nombres de los archivos HTML de las preguntas y otros pasos del quiz
const paginasQuiz = [
    'quiz/quiz.html',  // Página inicial del quiz
    'quiz/q1.html',    // Pregunta 1
    'quiz/q2.html',    // Pregunta 2
    'quiz/q3.html',    // Pregunta 3
    'quiz/q4.html',    // Pregunta 4
    'quiz/q5.html',    // Pregunta 5
    'quiz/q6.html',    // Pregunta 6
    'quiz/results.html', // Página de resultados
    'quiz/no.html',     // Página de resultado "No"
    'quiz/maybe.html',  // Página de resultado "Quizás"
    'quiz/yes.html'     // Página de resultado "Sí"
];

let paginaActual = 0; // Índice de la página actual
const quizContainer = document.getElementById('quiz-container'); // Contenedor del quiz

// Función para cargar dinámicamente una página HTML en el contenedor
function cargarPagina(index) {
    if (index >= 0 && index < paginasQuiz.length) {
        fetch(paginasQuiz[index]) // Hacemos la petición fetch para cargar el archivo HTML correspondiente
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar la página: ' + response.statusText);
                }
                return response.text(); // Convertimos la respuesta a texto (HTML)
            })
            .then(data => {
                quizContainer.innerHTML = data; // Insertamos el contenido HTML dentro del contenedor
                
                // Asignar event listeners después de cargar cada página
                const siguienteBtn = document.getElementById('siguiente');
                if (siguienteBtn) {
                    siguienteBtn.addEventListener('click', avanzar); // Conectamos el botón a la función avanzar
                }

                const retrocederBtn = document.getElementById('retroceder');
                if (retrocederBtn) {
                    retrocederBtn.addEventListener('click', retroceder); // Conectamos el botón a la función retroceder
                }

                // Asignar event listener para el botón de inicio
                const startBtn = document.getElementById('start');
                if (startBtn) {
                    startBtn.addEventListener('click', () => {
                        paginaActual = 1; // Establecer a la primera pregunta
                        cargarPagina(paginaActual); // Cargar la primera pregunta
                    });
                }
            })
            .catch(error => {
                console.error('Error al cargar la página:', error);
            });
    }
}

// Función para avanzar a la siguiente página del quiz
function avanzar() {
    if (paginaActual < paginasQuiz.length - 1) {
        paginaActual++;
        cargarPagina(paginaActual); // Cargar la siguiente página dentro del contenedor
    }
}

// Función para retroceder a la página anterior
function retroceder() {
    if (paginaActual > 0) {
        paginaActual--;
        cargarPagina(paginaActual); // Cargar la página anterior dentro del contenedor
    }
}

function showResults() {
    let count = Number(sessionStorage.getItem("count")); // Obtener el puntaje actual
    if (!count || count <= 2) {
        paginaActual = paginasQuiz.length - 3; // Índice de 'no.html'
    } else if (count > 2 && count <= 4) {
        paginaActual = paginasQuiz.length - 2; // Índice de 'maybe.html'
    } else {
        paginaActual = paginasQuiz.length - 1; // Índice de 'yes.html'
    }
    cargarPagina(paginaActual); // Cargar la página de resultados
}

function resetQuiz() {
    sessionStorage.clear(); // Limpiar el sessionStorage
    paginaActual = 0; // Restablecer a la página inicial
    cargarPagina(paginaActual); // Cargar la página inicial del quiz
}

// Inicializamos cargando la página de inicio del quiz
cargarPagina(paginaActual);

console.log("JavaScript enlazado correctamente.");
