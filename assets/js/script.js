const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const itemsToShow = 4; // Nombre d'images visibles
const totalItems = items.length;
let currentIndex = 0;

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