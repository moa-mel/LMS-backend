const fs = require('fs');
const path = require('path');

// Directory to store uploads from environment variable or default to './uploads'
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Your existing multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
