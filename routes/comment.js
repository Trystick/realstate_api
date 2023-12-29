import express from "express";
import { approveComment, createComment, createReply, deleteComment, getComment, getComments, getCommentsByPost, getReplies, getUnapprovedComments, isApproveComment, updateComment } from "../controller/comment.js";

const router = express.Router();

router.post('/', createComment);

router.post('/:commentId/replies', createReply);

router.get('/:id', getComment);

router.get('/', getComments);

router.get('/postId/:postId', getCommentsByPost);

router.get('/:commentId/replies', getReplies);

router.put('/:id', updateComment);

router.delete('/:id', deleteComment);

router.post('/unapproved/:id', getUnapprovedComments);

router.post('/approve/:id', approveComment);

router.get('/statusApprove/:id', isApproveComment);

export default router