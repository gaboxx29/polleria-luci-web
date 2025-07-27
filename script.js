$(document).ready(function() {
    // 1. Desplazamiento suave (Smooth Scroll) para los enlaces de navegación
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace

        // Obtiene el objetivo del enlace (ej. #productos)
        var target = $(this.getAttribute('href'));

        // Si el objetivo existe en la página
        if (target.length) {
            // Calcula la posición de desplazamiento, ajustando por la altura del header fijo
            var offset = $('header').outerHeight(); // Altura del header
            $('html, body').stop().animate({
                scrollTop: target.offset().top - offset
            }, 800); // Duración de la animación en milisegundos
        }

        // Cierra el navbar si está abierto (solo para Bootstrap 5)
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-toggler').click(); // Simula un click en el botón de hamburguesa
        }
    });

    // 2. Animaciones al hacer Scroll (Usando Intersection Observer para Animate.css)
    const revealElements = document.querySelectorAll('.reveal'); // Selecciona solo los elementos con la clase .reveal

    const observerOptions = {
        root: null, // El viewport es el root
        rootMargin: '0px',
        threshold: 0.1 // Porcentaje del elemento que debe estar visible para activar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible, añade la clase 'active' para activar la animación de CSS
                entry.target.classList.add('active');
                // Adicionalmente, si el elemento tiene clases de Animate.css, asegúrate de que se apliquen
                // Las clases animate__animated y sus subclases (ej. animate__fadeInDown) ya se manejan solas al cargar.
                // Esta parte es más para los elementos .reveal que tienen su propia transición.
                observer.unobserve(entry.target); // Deja de observar una vez que se activa la animación
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
});