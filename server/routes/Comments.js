const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json({ message: "Comment Added", success: true, comment });
});

router.delete("/:commenId", validateToken, async (req, res) => {
  const commentId = req.params.commenId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });
  res.json({ message: "Comment Deleted", success: true });
});

module.exports = router;
