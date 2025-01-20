const express = require("express");
const router = express.Router();
const { newEvent, postedEvents, deleteEvent } = require("../controllers/admin");
const upload = require("../config/multerConfig");


router.post("/newevent", upload.single('image'), newEvent);
router.get("/postedevents", postedEvents);
router.delete('/delete/:id', deleteEvent)

module.exports = router;
