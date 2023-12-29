import express from "express";
import { checkUserLike, createLike, deleteLike, getLike, getLikes, updateLike } from "../controller/like.js";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post('/', createLike);

router.get('/:likeId', getLike);

router.get('/', getLikes);

router.put('/:likeId', updateLike);

router.delete('/:likeId', deleteLike);

router.get("/check/:userId/:postId", checkUserLike);
export default router