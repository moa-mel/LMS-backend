const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Fellow = require('../../models/fellow');
const signUpSchema = require('../../schema/register');
const { generatePasswordCreationToken, sendPasswordCreationEmail } = require('../../utils/send-email');

// Multer setup for handling file uploads before passing them to Cloudinary
const upload = multer({ dest: 'uploads/' }).single('fellowCV');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const fellowRegister = async (req, res) => {
    try {
      // Handle file upload with multer
      upload(req, res, async function (err) {
        if (err) {
          return res.status(500).json({ message: "File upload failed" });
        }
  
        // Access the form data fields
        const { firstName, lastName, email, role, portfolio, linkedIn, github, dribble, behance } = req.body;
  
        // Handle the file if uploaded
        let fellowCV = '';
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'fellowCVs', // Folder in Cloudinary where files will be stored
          });
          fellowCV = result.secure_url; // Store the Cloudinary URL
        }
  
        // Validation
        const { error } = signUpSchema.validate({ firstName, lastName, email, fellowCV, role, portfolio, linkedIn, github, dribble, behance });
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
  
        // Create new Fellow instance and save to DB
        const user = new Fellow({
          firstName,
          lastName,
          email,
          role,
          fellowCV,
          portfolio,
          linkedIn,
          github,
          dribble,
          behance,
        });
  
        await user.save();
  
        // Generate token and send email
        const token = generatePasswordCreationToken(user.email);
        sendPasswordCreationEmail(user.email, token);
  
        return res.status(200).json({ status: true, message: 'Registration completed, check your email to create password' });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = { fellowRegister };
