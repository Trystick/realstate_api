import express from "express";
import { createAdvise, deleteAdvise, getAdvise, getAdvises, updateAdvise } from "../controller/advise.js";

const router = express.Router();
//Create
router.post("/", createAdvise);
//Update
router.put("/:id", updateAdvise);
//Delete
router.delete("/:id", deleteAdvise);
//Get
router.get("/:id", getAdvise);
//GetAll
router.get("/", getAdvises);

export default router