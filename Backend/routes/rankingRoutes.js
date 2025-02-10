const express = require("express");
const router = express.Router();
const {postRankingApproval, getUserSubmissions} = require('../controllers/ranking');
const upload = require('../config/multerConfig');

router.post('/approval',upload.single('screenshot'),  postRankingApproval);
router.get('/submissions/:userId', getUserSubmissions)

module.exports = router;