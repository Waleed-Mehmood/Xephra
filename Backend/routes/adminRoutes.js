// // routes/adminRoutes.js
// const express = require("express");
// const multer = require('multer');
// const { createProfile,getProfile, updateProfile } = require("../controllers/adminController");
// const router = express.Router();

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Directory to store images
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   });
//   const upload = multer({ storage });


// router.post('/createProfile', upload.single('profileImage'), createProfile);  
// router.get("/profile/:userId", getProfile);
// router.patch('/profile/:userId', upload.single('profileImage'), updateProfile);

// module.exports = router;
