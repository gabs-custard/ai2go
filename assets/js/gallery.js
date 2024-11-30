document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.gallery-carousel');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    
    let currentIndex = 0;
    const totalItems = items.length;

    // Clonar os primeiros e últimos itens para criar uma ilusão de infinito
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);
    
    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, items[0]);

    function updateCarousel() {
        const itemWidth = items[0].offsetWidth;
        const gap = 20; // Corresponde ao gap no CSS
        
        // Calcula o offset considerando o item clonado
        const offset = -((currentIndex + 1) * (itemWidth + gap));
        
        carousel.style.transform = `translateX(${offset}px)`;
    }

    function handleTransitionEnd() {
        // Reposiciona sem animação quando chegar nos clones
        if (currentIndex === totalItems) {
            carousel.style.transition = 'none';
            currentIndex = 0;
            updateCarousel();
            
            // Reativa a transição depois de um pequeno delay
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 50);
        }
        
        if (currentIndex === -1) {
            carousel.style.transition = 'none';
            currentIndex = totalItems - 1;
            updateCarousel();
            
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 50);
        }
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    carousel.addEventListener('transitionend', handleTransitionEnd);

    // Toque para mobile
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            nextBtn.click();
        } else if (touchEndX - touchStartX > 50) {
            prevBtn.click();
        }
    });

    // Inicializa a posição
    updateCarousel();
});