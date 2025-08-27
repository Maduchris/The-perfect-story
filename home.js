document.addEventListener('DOMContentLoaded', () => {
    const featuredGallery = document.getElementById('featured-gallery');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Define all available images
    const allImages = [
        // BRIDE images (1-114)
        ...[...Array(114)].map((_, i) => `Images/BRIDE/PerfectStory-${i + 1}.jpg`),
        // Special BRIDE image
        'Images/BRIDE/PerfectStory-287 (2).jpg',
        // GROOM images (115-134)
        ...[...Array(20)].map((_, i) => `Images/GROOM/PerfectStory-${i + 115}.jpg`),
        // DETAILS images (135-154)
        ...[...Array(20)].map((_, i) => `Images/DETAILS/PerfectStory-${i + 135}.jpg`),
        // BRIDE & GROOM images (155-174)
        ...[...Array(20)].map((_, i) => `Images/BRIDE & GROOM/PerfectStory-${i + 155}.jpg`),
        // CHURCH images (175-194)
        ...[...Array(20)].map((_, i) => `Images/CHURCH/PerfectStory-${i + 175}.jpg`),
        // EVENT images (195-214)
        ...[...Array(20)].map((_, i) => `Images/EVENT/PerfectStory-${i + 195}.jpg`)
    ];

    function createGalleryItem(imagePath) {
        const div = document.createElement('div');
        div.className = 'gallery-item fade-in';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Wedding Photo';
        img.onerror = () => {
            div.remove(); // Remove the item if image fails to load
        };
        
        div.appendChild(img);
        return div;
    }

    // Get random items from array
    function getRandomItems(arr, count) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Load featured gallery with 15 random images
    function loadFeaturedGallery() {
        const selectedImages = getRandomItems(allImages, 15);
        
        // Clear existing content
        featuredGallery.innerHTML = '';
        
        // Add selected images to the gallery
        selectedImages.forEach(imagePath => {
            const galleryItem = createGalleryItem(imagePath);
            featuredGallery.appendChild(galleryItem);
            
            // Add click event for modal
            galleryItem.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = imagePath;
            });
        });
    }

    // Initialize the gallery
    loadFeaturedGallery();

    // Close modal when clicking the × button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Random animation of gallery items
    function animateRandomImage() {
        const items = document.querySelectorAll('.gallery-item');
        if (items.length === 0) return;
        
        const randomItem = items[Math.floor(Math.random() * items.length)];
        randomItem.style.transform = 'scale(1.05)';
        setTimeout(() => {
            randomItem.style.transform = 'scale(1)';
        }, 1000);
    }

    // Start random animations
    setInterval(animateRandomImage, 3000);
}); 