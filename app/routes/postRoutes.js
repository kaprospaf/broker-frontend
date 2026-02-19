const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getPosts);
router.post("/", protect, upload.single("image"), createPost);
router.delete("/:id", protect, deletePost);
router.put("/:id", protect, updatePost);

module.exports = router;
