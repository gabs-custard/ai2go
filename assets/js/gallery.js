document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.gallery-carousel');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const items = document.querySelectorAll('.gallery-item');
    
    let currentIndex = 0;
    const totalItems = items.length;

    function updateCarousel() {
        const carouselWidth = carousel.offsetWidth;
        const itemWidth = items[0].offsetWidth;
        const offset = -(currentIndex * (itemWidth + 20));

        carousel.style.transform = `translateX(${offset}px)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalItems - 1;

        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = currentIndex >= totalItems - 1 ? '0.5' : '1';
        nextBtn.style.cursor = currentIndex >= totalItems - 1 ? 'not-allowed' : 'pointer';
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            // Deslizou para esquerda
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateCarousel();
            }
        } else if (touchEndX - touchStartX > 50) {
            // Deslizou para direita
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    });

    updateCarousel();
});