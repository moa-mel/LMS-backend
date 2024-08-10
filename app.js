const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fellowRouter = require("./routes/fellowRoute");
const adminRoute = require("./routes/adminRoute");
const cloudinary = require('cloudinary').v2

const app = express();


// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());



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