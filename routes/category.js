import express from "express";
import { createCategory, deleteCategory, getCategory, getCategorys, updateCategory } from "../controller/category.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createCategory);
//Update
router.put("/:id", verifyAdmin, updateCategory);
//Delete
router.delete("/:id", verifyAdmin, deleteCategory);
//Get
router.get("/:id", getCategory);
//GetAll
router.get("/", getCategorys);

export default router