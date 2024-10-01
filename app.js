const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cors = require('cors')
const path = require('path');
const fellowRouter = require("./routes/fellowRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: function (req, file, cb) {
    // Add any file type checks here if needed
    cb(null, true);
  }
});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors())

// Custom middleware to handle file uploads
app.use((req, res, next) => {
  if (req.is('multipart/form-data')) {
    upload.single('fellowCV')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error', details: err.message });
      } else if (err) {
        console.log(err)
        return res.status(500).json({ error: 'Server error during file upload' });
      }
      next();
    });
  } else {
    next();
  }
});

// Routes
app.use('/api', fellowRouter);
app.use('', adminRoute);

// Database connection
mongoose.connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Unable to connect to the database", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server connected to port ${port}`);
});