import express from "express";
import {createSlider, deleteSlider, getSlider, getSliders, updateSlider } from "../controller/slider.js";


const router = express.Router();
//Create
router.post("/", createSlider);
//Update
router.put("/:id", updateSlider);
//Delete
router.delete("/:id", deleteSlider);
//Get
router.get("/:id", getSlider);
//GetAll
router.get("/", getSliders);

export default router