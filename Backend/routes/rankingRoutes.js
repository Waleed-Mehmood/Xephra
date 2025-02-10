const express = require("express");
const router = express.Router();
const {postRankingApproval} = require('../controllers/ranking');
const upload = require('../config/multerConfig');

router.post('/approval',upload.single('screenshot'),  postRankingApproval);

module.exports = router;