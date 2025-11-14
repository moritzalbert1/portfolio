// Universelle Lightbox für Galerien
document.addEventListener('DOMContentLoaded', function() {
    const mediaItems = document.querySelectorAll('.lightbox-item, .gallery img, .media-row img, .media-row video');
    
    if (mediaItems.length === 0) return;
    
    let currentIndex = 0;

    // Lightbox erstellen
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="close">×</span>
        <span class="arrow left">‹</span>
        <span class="arrow right">›</span>
        <img class="lightbox-img" src="" alt="">
        <video class="lightbox-video" src="" controls></video>
    `;
    document.body.appendChild(lightbox);

    const img = lightbox.querySelector('.lightbox-img');
    const video = lightbox.querySelector('.lightbox-video');
    const close = lightbox.querySelector('.close');
    const left = lightbox.querySelector('.arrow.left');
    const right = lightbox.querySelector('.arrow.right');

    function showItem(index) {
        const item = mediaItems[index];
        if (!item) return;

        // Reset
        img.style.display = 'none';
        video.style.display = 'none';
        video.pause();
        video.currentTime = 0;

        // Anzeigen je nach Medium
        if (item.tagName === 'IMG') {
            img.src = item.src;
            img.style.display = 'block';
        } else if (item.tagName === 'VIDEO') {
            video.src = item.src;
            video.style.display = 'block';
            video.play();
        }

        lightbox.classList.add('active');
        currentIndex = index;
    }

    // Klick auf ein Medium
    mediaItems.forEach((item, index) => {
        item.addEventListener('click', () => showItem(index));
    });

    // Close Button
    close.addEventListener('click', () => {
        lightbox.classList.remove('active');
        video.pause();
    });

    // Pfeile
    left.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        showItem(currentIndex);
    });
    
    right.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        showItem(currentIndex);
    });

    // Tastatur-Navigation
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            video.pause();
        }
        if (e.key === 'ArrowLeft') left.click();
        if (e.key === 'ArrowRight') right.click();
    });
});