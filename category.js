document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Get current category from page filename
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Map page names to folder names
    const categoryFolders = {
        'bride': 'BRIDE',
        'groom': 'GROOM',
        'details': 'DETAILS',
        'bride-and-groom': 'BRIDE & GROOM',
        'church': 'CHURCH',
        'events': 'EVENT',
        'order': 'ORDER OF PHOTOGRAPHS'
    };

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

    function loadCategoryImages() {
        const categoryFolder = categoryFolders[currentPage];
        if (!categoryFolder) return;

        // Clear existing content
        gallery.innerHTML = '';
        
        // Load all images from the category
        fetch(`get_images.php?category=${categoryFolder}`)
            .then(response => response.json())
            .then(images => {
                images.forEach(imagePath => {
                    const galleryItem = createGalleryItem(`Images/${categoryFolder}/${imagePath}`);
                    gallery.appendChild(galleryItem);
                    
                    // Add click event for modal
                    galleryItem.addEventListener('click', () => {
                        modal.style.display = 'block';
                        modalImg.src = imagePath;
                    });
                });
            })
            .catch(error => console.error('Error loading images:', error));
    }

    // Initialize the gallery
    loadCategoryImages();

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
}); 