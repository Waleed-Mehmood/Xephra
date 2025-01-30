const express = require("express");
const router = express.Router();
const { createProfile, getProfile ,updateProfile, getUsers, upcomingEvents } = require("../controllers/user");
const upload = require("../config/multerConfig");


router.post('/createProfile', upload.single('profileImage'), createProfile);  
router.get("/profile/:userId", getProfile);
router.patch('/profile/:userId', upload.single('profileImage'), updateProfile);
router.get('/getusers', getUsers);
router.get("/upcomingevents", upcomingEvents);

module.exports = router;





