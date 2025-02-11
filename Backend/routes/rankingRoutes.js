const express = require("express");
const router = express.Router();
const {postRankingApproval, getUserSubmissions, userApprovalDelete} = require('../controllers/ranking');
const upload = require('../config/multerConfig');

router.post('/approval',upload.single('screenshot'),  postRankingApproval);
router.get('/submissions/:userId', getUserSubmissions)
router.delete('/approvaldelete', userApprovalDelete )

module.exports = router;