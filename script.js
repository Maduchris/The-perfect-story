document.addEventListener('DOMContentLoaded', () => {
    // Define all available categories and their paths
    const categories = {
        'BRIDE': 'Images/BRIDE',
        'GROOM': 'Images/GROOM',
        'DETAILS': 'Images/DETAILS',
        'BRIDE & GROOM': 'Images/BRIDE & GROOM',
        'CHURCH': 'Images/CHURCH',
        'EVENT': 'Images/EVENT',
        'ORDER OF PHOTOGRAPHS': 'Images/ORDER OF PHOTOGRAPHS'
    };

    const animatedGallery = document.getElementById('animated-gallery');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Function to get all available images
    function getAllImages() {
        const allImages = [
            // BRIDE images
            ...[...Array(114)].map((_, i) => `${categories['BRIDE']}/PerfectStory-${i + 1}.jpg`),
            // Add special case for BRIDE
            `${categories['BRIDE']}/PerfectStory-287 (2).jpg`,
            // Add ranges for other categories based on their contents
            ...[...Array(20)].map((_, i) => `${categories['GROOM']}/PerfectStory-${i + 115}.jpg`),
            ...[...Array(20)].map((_, i) => `${categories['DETAILS']}/PerfectStory-${i + 135}.jpg`),
            ...[...Array(20)].map((_, i) => `${categories['BRIDE & GROOM']}/PerfectStory-${i + 155}.jpg`),
            ...[...Array(20)].map((_, i) => `${categories['CHURCH']}/PerfectStory-${i + 175}.jpg`),
            ...[...Array(20)].map((_, i) => `${categories['EVENT']}/PerfectStory-${i + 195}.jpg`)
        ];
        return allImages;
    }

    // Function to get random items from array
    function getRandomItems(arr, count) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Function to create gallery items
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

    // Load 15 random images for the featured gallery
    function loadFeaturedGallery() {
        const allImages = getAllImages();
        const selectedImages = getRandomItems(allImages, 15);
        
        animatedGallery.innerHTML = ''; // Clear existing content
        
        selectedImages.forEach(imagePath => {
            const galleryItem = createGalleryItem(imagePath);
            animatedGallery.appendChild(galleryItem);
            
            // Add click event for modal
            galleryItem.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = imagePath;
            });
        });
    }

    // Initialize the featured gallery
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