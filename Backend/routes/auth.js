const express = require("express");
const router = express.Router();
const {signup, Login, forgot, reset} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login", Login);
router.post("/forgot", forgot);
router.post('/reset/:token', reset);

module.exports = router;