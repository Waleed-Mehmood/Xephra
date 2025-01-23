const express = require("express");
const router = express.Router();
const {getUsers} = require('../controllers/user.js');


router.get('/getusers', getUsers);

module.exports = router;