const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary (now using local config file)
const config = require('./cloudinary-config');
cloudinary.config(config);

// Function to upload a single image
async function uploadImage(imagePath, folderName) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: `the-perfect-story/${folderName}`,
      resource_type: 'image'
    });
    
    return {
      originalName: path.basename(imagePath),
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error(`Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

// Function to scan and upload all images in a directory
async function uploadDirectory(dirPath, folderName) {
  const imageUrls = [];
  
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory ${dirPath} does not exist`);
    return imageUrls;
  }
  
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i.test(file)) {
      console.log(`Uploading ${file}...`);
      const result = await uploadImage(filePath, folderName);
      if (result) {
        imageUrls.push(result);
      }
    }
  }
  
  return imageUrls;
}

// Main function to upload all images
async function uploadAllImages() {
  const imageFolders = [
    'Images/Home Page',
    'Images/Pre Wedding Page', 
    'Images/Order of Photographs Page',
    'Images/Bride & Groom Page',
    'Images/Bride Page',
    'Images/Church Page',
    'Images/Details Page',
    'Images/Events Page',
    'Images/Groom Page'
  ];
  
  const allImageUrls = {};
  
  for (const folder of imageFolders) {
    const folderName = path.basename(folder);
    console.log(`\nProcessing ${folderName}...`);
    
    const urls = await uploadDirectory(folder, folderName);
    allImageUrls[folderName] = urls;
  }
  
  // Save URLs to a JSON file
  fs.writeFileSync('image-urls.json', JSON.stringify(allImageUrls, null, 2));
  console.log('\n✅ All images uploaded! URLs saved to image-urls.json');
  
  return allImageUrls;
}

// Run the upload
if (require.main === module) {
  uploadAllImages().catch(console.error);
}

module.exports = { uploadImage, uploadDirectory, uploadAllImages }; 