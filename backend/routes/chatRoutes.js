const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const { accessChat } = require("../controller/chatController");

router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addIntoGroup);

module.exports = router;
