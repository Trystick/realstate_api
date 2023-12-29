import express from "express";
import { createJobApply, deleteJobApply, getJobApply, getJobApplys, updateJobApply } from "../controller/jobapply.js";

const router = express.Router();
//Create
router.post("/", createJobApply);
//Update
router.put("/:id", updateJobApply);
//Delete
router.delete("/:id", deleteJobApply);
//Get
router.get("/:id", getJobApply);
//GetAll
router.get("/", getJobApplys);

export default router