import express from "express";
import { createJob, deleteJob, getJob, getJobs, updateJob } from "../controller/job.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/:jobCategoryid", verifyAdmin, createJob);
//Update
router.put("/:id", verifyAdmin, updateJob);
//Delete
router.delete("/:id/:jobCategoryid", verifyAdmin, deleteJob);
//Get
router.get("/find/:id", getJob);
//GetAll
router.get("/", getJobs);

export default router