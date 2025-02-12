const express = require("express");
const router = express.Router();
const {postRankingApproval, getUserSubmissions, userApprovalDelete , assignEventRanking} = require('../controllers/ranking');
const upload = require('../config/multerConfig');

router.post('/approval',upload.single('screenshot'),  postRankingApproval);
router.get('/submissions/:userId', getUserSubmissions);
router.delete('/approvaldelete', userApprovalDelete );
router.post('/assign-rank', assignEventRanking);

module.exports = router;