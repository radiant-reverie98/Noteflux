const cloudinary = require('cloudinary')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'noteflux/posts', // customize folder name
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
  },
});

const upload = multer({ storage })

module.exports = upload