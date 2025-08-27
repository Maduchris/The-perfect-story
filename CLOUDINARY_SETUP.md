# Cloudinary Image Hosting Setup

## 🚀 Quick Setup Guide

### 1. Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Get your credentials from the dashboard

### 2. Configure Credentials
Edit `cloudinary-config.js` and replace:
- `YOUR_CLOUD_NAME` with your Cloudinary cloud name
- `YOUR_API_KEY` with your API key
- `YOUR_API_SECRET` with your API secret

### 3. Update Upload Script
Edit `upload-images.js` and replace the config section with:
```javascript
const config = require('./cloudinary-config');
cloudinary.config(config);
```

### 4. Upload Images
```bash
node upload-images.js
```

### 5. Update Your Website
```bash
node image-manager.js
```

## 📁 What This Does

✅ **Uploads all images** to Cloudinary  
✅ **Generates URLs** for each image  
✅ **Updates your HTML** to use Cloudinary URLs  
✅ **Keeps repository small** (no large files)  
✅ **Creates image gallery** for testing  

## 🎯 Benefits

- **No file size limits** (Cloudinary handles large images)
- **Fast loading** (CDN delivery)
- **Automatic optimization** (resizing, compression)
- **Backup storage** (images safe in the cloud)
- **Easy management** (organize by folders)

## 📝 Files Created

- `upload-images.js` - Upload script
- `image-manager.js` - URL management
- `cloudinary-config.js` - Configuration
- `image-urls.json` - Generated URLs
- `image-gallery.html` - Test gallery
- `.gitignore` - Exclude large files

## 🔧 Next Steps

1. Set up Cloudinary account
2. Add your credentials
3. Run the upload script
4. Commit the changes (without large images)
5. Deploy your website

Your repository will be small and fast, while your images load quickly from Cloudinary! 