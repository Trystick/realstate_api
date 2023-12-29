import express from "express";
import { createCategoryLandLease, deleteCategoryLandLease, getCategoryLandLease, getCategoryLandLeases, updateCategoryLandLease } from "../controller/categorylandlease.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createCategoryLandLease);
//Update
router.put("/:id", verifyAdmin, updateCategoryLandLease);
//Delete
router.delete("/:id", verifyAdmin, deleteCategoryLandLease);
//Get
router.get("/:id", getCategoryLandLease);
//GetAll
router.get("/", getCategoryLandLeases);

export default router