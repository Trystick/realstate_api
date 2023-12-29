import express from "express";
import { createJobCategory, deleteJobCategory, getJobCategory, getJobCategorys, updateJobCategory } from "../controller/jobcategory.js";
import {  } from "../controller/postcategory.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createJobCategory);
//Update
router.put("/:id", verifyAdmin, updateJobCategory);
//Delete
router.delete("/:id", verifyAdmin, deleteJobCategory);
//Get
router.get("/:id", getJobCategory);
//GetAll
router.get("/", getJobCategorys);

export default router