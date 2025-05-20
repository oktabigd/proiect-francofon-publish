document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('main');
    const toggleBtn = document.getElementById('toggle-btn');
    
    const sidebarState = localStorage.getItem('sidebarState');
    if (sidebarState === 'retracted') {
        sidebar.classList.add('retracted');
        main.classList.add('retracted');
    }

    toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('retracted');
        main.classList.toggle('retracted');
        const currentState = sidebar.classList.contains('retracted') ? 'retracted' : 'expanded';
        localStorage.setItem('sidebarState', currentState);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.gallery-track');
    const images = document.querySelectorAll('.gallery-image');
    const dots = document.querySelectorAll('.dot');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const galleryContainer = document.querySelector('.gallery-container');
    const totalImages = images.length;
    let currentIndex = 0; 

    // Lightbox elements
    let lightboxOverlay = document.getElementById('lightbox-overlay');
    let lightboxImg = document.getElementById('lightbox-img');
    let lightboxPrev = document.getElementById('lightbox-prev');
    let lightboxNext = document.getElementById('lightbox-next');
    let lightboxClose = document.getElementById('lightbox-close');

    // Create lightbox if not present
    if (!lightboxOverlay) {
        lightboxOverlay = document.createElement('div');
        lightboxOverlay.id = 'lightbox-overlay';
        lightboxOverlay.style.display = 'none';
        lightboxOverlay.innerHTML = `
            <button class="lightbox-arrow left" id="lightbox-prev" aria-label="Précédent">&#10094;</button>
            <img id="lightbox-img" src="" alt="Photo en grand" />
            <button class="lightbox-arrow right" id="lightbox-next" aria-label="Suivant">&#10095;</button>
            <button id="lightbox-close" aria-label="Fermer">&times;</button>
        `;
        document.body.appendChild(lightboxOverlay);
        lightboxImg = document.getElementById('lightbox-img');
        lightboxPrev = document.getElementById('lightbox-prev');
        lightboxNext = document.getElementById('lightbox-next');
        lightboxClose = document.getElementById('lightbox-close');
    }

    function updateGallery() { 
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages; 
        updateGallery();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages; 
        updateGallery();
    }

    rightBtn.addEventListener('click', nextImage);
    leftBtn.addEventListener('click', prevImage);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateGallery();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (lightboxOverlay.style.display === 'flex') {
            if (event.key === 'ArrowRight') {
                showNextLightbox();
            } else if (event.key === 'ArrowLeft') {
                showPrevLightbox();
            } else if (event.key === 'Escape') {
                closeLightbox();
            }
        } else {
            if (event.key === 'ArrowRight') {
                nextImage();
            } else if (event.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });

    // Lightbox functions
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightboxOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxOverlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    function showPrevLightbox() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        lightboxImg.src = images[currentIndex].src;
    }

    function showNextLightbox() {
        currentIndex = (currentIndex + 1) % totalImages;
        lightboxImg.src = images[currentIndex].src;
    }

    lightboxPrev.addEventListener('click', showPrevLightbox);
    lightboxNext.addEventListener('click', showNextLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) closeLightbox();
    });

    // Fullscreen button opens lightbox with current image
    fullscreenBtn.addEventListener('click', () => {
        openLightbox(currentIndex);
    });

    // Optional: click on image in slider also opens lightbox
    images.forEach((img, idx) => {
        img.addEventListener('click', () => openLightbox(idx));
    });

    updateGallery();
});





