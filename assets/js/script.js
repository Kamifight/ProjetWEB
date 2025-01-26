// Fonction pour initialiser un carrousel avec gestion des boutons de navigation et du glissement (drag)
function initializeCarousel(carouselId, prevButtonId = null, nextButtonId = null) {
    // Sélectionne les éléments du carrousel, ainsi que les boutons de navigation
    const carousel = document.getElementById(carouselId);
    const carouselInner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById(prevButtonId);
    const nextButton = document.getElementById(nextButtonId);

    // Définit le nombre d'éléments à afficher et la configuration initiale
    const itemsToShow = 4; // Nombre d'images visibles dans le carrousel
    const totalItems = items.length;
    let currentIndex = 0; // Indice de l'image actuellement affichée

    // Variables pour la gestion du glissement
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Détermine la limite maximale de défilement pour le carrousel
    const maxDrag = -carouselInner.scrollWidth + carousel.offsetWidth;

    // Fonction qui met à jour la position du carrousel selon l'indice actuel
    function updateCarousel() {
        const offset = -currentIndex * (100 / itemsToShow);
        carouselInner.style.transform = `translateX(${offset}%)`; // Déplace les éléments à l'intérieur du carrousel
    }

    // Gestion des événements des boutons de navigation (précédent et suivant)
    if (prevButtonId && nextButtonId) {
        prevButton.addEventListener('click', () => {
            // Mise à jour de l'indice et mise à jour de la position du carrousel
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - itemsToShow;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            // Mise à jour de l'indice et mise à jour de la position du carrousel
            currentIndex = (currentIndex + 1) % (totalItems - itemsToShow + 1);
            updateCarousel();
        });
    }

    // Lorsque l'utilisateur appuie sur la souris
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        carousel.classList.add('dragging');
    });

    // Lors du mouvement de la souris
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.pageX;
        const walk = x - startX; // Distance parcourue par la souris
        currentTranslate = Math.max(Math.min(prevTranslate + walk, 0), maxDrag); // Déplace l'élément

        carouselInner.style.transform = `translateX(${currentTranslate}px)`; // Applique le déplacement
    });

    // Lorsque l'utilisateur relâche la souris
    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        const itemWidth = carouselInner.scrollWidth / totalItems;
        currentIndex = Math.round(Math.abs(currentTranslate) / itemWidth);
        currentTranslate = -currentIndex * itemWidth; // Applique la nouvelle position
        prevTranslate = currentTranslate;

        carouselInner.style.transition = 'transform 0.5s ease';
        carouselInner.style.transform = `translateX(${currentTranslate}px)`;

        setTimeout(() => carouselInner.style.transition = '', 500);
        carousel.classList.remove('dragging');
    });

    // Si l'utilisateur quitte la zone du carrousel avec la souris
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

    // Initialisation de la position du carrousel lors de son chargement
    updateCarousel();
}


// Initialisation des deux carrousels
initializeCarousel('first-carousel', 'prev-first', 'next-first');
initializeCarousel('second-carousel');

// Empêche le zoom via la molette lorsque la touche Ctrl est enfoncée
document.addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault(); // Annule l'effet de zoom
    }
}, { passive: false });

// Fonction pour faire défiler les images dans un carrousel
function cycleImages(imageId, imageArray) {
    const imageElement = document.getElementById(imageId);
    // Crée un indicateur de position sous forme de div avec des points
    const indicator = document.createElement('div');
    indicator.classList.add('image-indicator');
    imageElement.parentElement.style.position = 'relative';
    imageElement.parentElement.appendChild(indicator);

    let currentIndex = 0; // Indice de l'image actuelle

    // Fonction pour mettre à jour l'indicateur en fonction de l'image affichée
    function updateIndicator() {
        indicator.innerHTML = '';
        for (let i = 0; i < imageArray.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            indicator.appendChild(dot);
        }
    }

    // Change l'image toutes les 3 secondes
    setInterval(() => {
        currentIndex = (currentIndex + 1) % imageArray.length;
        imageElement.src = imageArray[currentIndex];
        updateIndicator(); //
    }, 3000); //

    updateIndicator(); // Initialise l'indicateur au démarrage
}

// Liste des images à faire défiler
const images = [
    'assets/img/smile1.png',
    'assets/img/smile2.png',
    'assets/img/smile3.png'
];

// Appelle la fonction de défilement d'images sur l'élément 'image-qui-bouge'
cycleImages('image-qui-bouge', images);
