const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const itemsToShow = 4; // Nombre d'images visibles
const totalItems = items.length;
let currentIndex = 0;

const carousel = document.querySelector('.carousel');
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;


function updateCarousel() {
    const offset = -currentIndex * (100 / itemsToShow);
    carouselInner.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - itemsToShow;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % (totalItems - itemsToShow + 1);
    updateCarousel();
});


const maxDrag = -carouselInner.scrollWidth + carousel.offsetWidth; // Limite de défilement maximale

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    //e.preventDefault(); // Empêche les comportements par défaut (comme la sélection de texte)
    startX = e.pageX;
    carousel.classList.add('dragging');
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    //e.preventDefault();// Empêche les comportements par défaut (comme la sélection de texte)
    const x = e.pageX;
    const walk = x - startX;
    currentTranslate = Math.max(Math.min(prevTranslate + walk, 0), maxDrag);

    carouselInner.style.transform = `translateX(${currentTranslate}px)`;
});

carousel.addEventListener('mouseup', () => {
    isDragging = false;
    const itemWidth = carouselInner.scrollWidth / totalItems;
    currentIndex = Math.round(Math.abs(currentTranslate) / itemWidth);
    currentTranslate = -currentIndex * itemWidth;
    prevTranslate = currentTranslate;

    carouselInner.style.transition = 'transform 0.5s ease';
    carouselInner.style.transform = `translateX(${currentTranslate}px)`;

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
        carouselInner.style.transform = `translateX(${currentTranslate}px)`;

        setTimeout(() => carouselInner.style.transition = '', 500);
        carousel.classList.remove('dragging');
    }
});


