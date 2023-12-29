import Comment from "../models/Comment.js";
import User from '../models/User.js'

export const createComment = async (req, res) => {
  try {
      const user = await User.findById(req.body.userId);
      const comment = new Comment({
        ...req.body,
        isApproved: user.type ? true : false,  // nếu người dùng có type, không cần kiểm duyệt
      });
      await comment.save();
      res.status(201).send(comment);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};

export const createReply = async (req, res) => {
  const { userId, content } = req.body;

  try {
    const comment = await Comment.findById(req.params.commentId);
    const user = await User.findById(userId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const reply = new Comment({
      userId,
      postId: comment.postId,
      parentId: comment._id,
      content,
      replies: [],
      isApproved: user.type ? true : false,  // nếu người dùng có type, không cần kiểm duyệt
    });

    await reply.save();

    comment.replies.push(reply);
    await comment.save();

    res.status(201).json({ message: 'Reply created successfully', reply });
    } catch (error) {
      res.status(500).json({ message: 'Error creating reply', error });
    }
};



export const getComment = async (req, res) => {
  try {
      const comment = await Comment.findById(req.params.id).populate('replies');
      if (comment) {
          res.send(comment);
      } else {
          res.status(404).send({ message: 'Comment not found.' });
      }
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};


export const getComments = async (req, res) => {
  try {
      const comments = await Comment.find().populate('replies');
      res.send(comments);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
      const comments = await Comment.find({ postId: req.params.postId, parentId: null, isApproved: true }).populate('replies');
      res.send(comments);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};

export const getReplies = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate('replies');

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const approvedReplies = comment.replies.filter(reply => reply.isApproved);
    res.status(200).json(approvedReplies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching replies', error });
  }
};

  

export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(comment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getUnapprovedComments = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id, isApproved: false });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or already approved' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const approveComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    comment.isApproved = true;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// API để lấy trạng thái isApproved của một bình luận
export const isApproveComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ isApproved: comment.isApproved });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
