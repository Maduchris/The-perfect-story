const fs = require('fs');

// Load image URLs from the JSON file
function loadImageUrls() {
  try {
    const data = fs.readFileSync('image-urls.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading image URLs:', error.message);
    return {};
  }
}

// Get image URL by folder and filename
function getImageUrl(folderName, fileName) {
  const imageUrls = loadImageUrls();
  const folder = imageUrls[folderName];
  
  if (!folder) {
    console.warn(`Folder ${folderName} not found in image URLs`);
    return null;
  }
  
  const image = folder.find(img => img.originalName === fileName);
  return image ? image.url : null;
}

// Replace local image paths with Cloudinary URLs in HTML files
function updateHtmlFiles() {
  const imageUrls = loadImageUrls();
  
  // Read HTML files
  const htmlFiles = ['index.html'];
  
  htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      // Replace image src attributes
      Object.keys(imageUrls).forEach(folderName => {
        imageUrls[folderName].forEach(image => {
          const oldPath = `Images/${folderName}/${image.originalName}`;
          const newPath = image.url;
          
          // Replace various possible path formats
          content = content.replace(
            new RegExp(`src=["']${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g'),
            `src="${newPath}"`
          );
          
          content = content.replace(
            new RegExp(`src=["']\./${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g'),
            `src="${newPath}"`
          );
        });
      });
      
      // Write updated content
      fs.writeFileSync(file, content);
      console.log(`✅ Updated ${file} with Cloudinary URLs`);
    }
  });
}

// Generate a simple image gallery HTML
function generateImageGallery() {
  const imageUrls = loadImageUrls();
  let html = '<!DOCTYPE html>\n<html>\n<head>\n<title>Image Gallery</title>\n</head>\n<body>\n';
  
  Object.keys(imageUrls).forEach(folderName => {
    html += `<h2>${folderName}</h2>\n<div style="display: flex; flex-wrap: wrap; gap: 10px;">\n`;
    
    imageUrls[folderName].forEach(image => {
      html += `<img src="${image.url}" alt="${image.originalName}" style="max-width: 200px; height: auto;">\n`;
    });
    
    html += '</div>\n<br>\n';
  });
  
  html += '</body>\n</html>';
  
  fs.writeFileSync('image-gallery.html', html);
  console.log('✅ Generated image-gallery.html');
}

module.exports = {
  loadImageUrls,
  getImageUrl,
  updateHtmlFiles,
  generateImageGallery
};

// Run if called directly
if (require.main === module) {
  updateHtmlFiles();
  generateImageGallery();
} 