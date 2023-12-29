import express from "express";
import { createPostCategory, deletePostCategory, getPostCategory, getPostCategorys, updatePostCategory } from "../controller/postcategory.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createPostCategory);
//Update
router.put("/:id", verifyAdmin, updatePostCategory);
//Delete
router.delete("/:id", verifyAdmin, deletePostCategory);
//Get
router.get("/:id", getPostCategory);
//GetAll
router.get("/", getPostCategorys);

export default router