// Load tools for managing file uploads
const multer = require('multer'); // Handles file uploads
const { v4: uuidv4 } = require('uuid'); // Generates unique IDs
const path = require('path'); // Deals with file paths
  // no need to install . already installed. only require

// Set up where uploaded files go and how they're named
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the folder where files will be saved
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    // Create a unique ID and combine it with the original filename
    const unique = uuidv4(); // Generate a unique ID
    cb(null, unique + path.extname(file.originalname)); // Combine ID with file extension
  }
});

// Create a tool for handling uploads using the storage settings
const upload = multer({ storage: storage });

// Export this tool so it can be used elsewhere
module.exports = upload;
//remember to require it in index.js





