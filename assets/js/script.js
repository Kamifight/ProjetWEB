function initializeCarousel(carouselId, prevButtonId = null, nextButtonId = null) {
    const carousel = document.getElementById(carouselId);
    const carouselInner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById(prevButtonId);
    const nextButton = document.getElementById(nextButtonId);

    const itemsToShow = 4; // Nombre d'images visibles
    const totalItems = items.length;
    let currentIndex = 0;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    const maxDrag = -carouselInner.scrollWidth + carousel.offsetWidth; // Limite de défilement maximale

    // Mise à jour de la position du carrousel
    function updateCarousel() {
        const offset = -currentIndex * (100 / itemsToShow);
        carouselInner.style.transform = translateX(${offset}%);
    }

     // Gestion des boutons de navigation (si disponibles)
    if (prevButtonId && nextButtonId) {
        const prevButton = document.getElementById(prevButtonId);
        const nextButton = document.getElementById(nextButtonId);

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - itemsToShow;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % (totalItems - itemsToShow + 1);
            updateCarousel();
        });
    }

    // Gestion du drag-and-drop
carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        carousel.classList.add('dragging');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.pageX;
        const walk = x - startX;
        currentTranslate = Math.max(Math.min(prevTranslate + walk, 0), maxDrag);

        carouselInner.style.transform = translateX(${currentTranslate}px);
    });

    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        const itemWidth = carouselInner.scrollWidth / totalItems;
        currentIndex = Math.round(Math.abs(currentTranslate) / itemWidth);
        currentTranslate = -currentIndex * itemWidth;
        prevTranslate = currentTranslate;

        carouselInner.style.transition = 'transform 0.5s ease';
        carouselInner.style.transform = translateX(${currentTranslate}px);

        setTimeout(() => carouselInner.style.transition = '', 500);
        carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            const itemWidth = carouselInner.scrollWidth / totalItems;
            currentIndex = Math.round(Math.abs(currentTranslate) / itemWidth);
            currentTranslate = -currentIndex * itemWidth;
            prevTranslate = currentTranslate;

            carouselInner.style.transition = 'transform 0.5s ease';
            carouselInner.style.transform = translateX(${currentTranslate}px);

            setTimeout(() => carouselInner.style.transition = '', 500);
            carousel.classList.remove('dragging');
        }
    });

    updateCarousel();
}

// Initialisation des deux carrousels
initializeCarousel('first-carousel', 'prev-first', 'next-first');
initializeCarousel('second-carousel');
document.addEventListener('wheel', function(event) {
        if (event.ctrlKey) {
            event.preventDefault();
        }
    }, { passive: false });