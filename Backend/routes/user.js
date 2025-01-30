const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfile,
  updateProfile,
  getUsers,
  deleteUser,
  suspendUser,
  getUser,
  upcomingEvents,
  joinEvent,
  getEvents,
} = require("../controllers/user");
const upload = require("../config/multerConfig");

router.post("/createProfile", upload.single("profileImage"), createProfile);
router.get("/profile/:userId", getProfile);
router.patch("/profile/:userId", upload.single("profileImage"), updateProfile);
router.get("/getusers", getUsers);
router.get("/user/:userId", getUser);
router.delete("/user/:userId", deleteUser);
router.patch("/usersuspend/:userId", suspendUser);
router.get("/upcomingevents", upcomingEvents);

router.post("/event-join", joinEvent);
router.get("/registered-events", getEvents);

module.exports = router;
