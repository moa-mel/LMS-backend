const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const uploadImage = async (image ) => {
    try {
        const result = cloudinary.uploader.upload(`${image}` )
        return result
    } catch (error) {
        console.log(error)
    }
};



module.exports = uploadImage