import express from "express";
import { createPacketType, deletePacketType, getPacketType, getPacketTypes, updatePacketType } from "../controller/packettype.js";


import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createPacketType);
//Update
router.put("/:id", verifyAdmin, updatePacketType);
//Delete
router.delete("/:id", verifyAdmin, deletePacketType);
//Get
router.get("/:id", getPacketType);
//GetAll
router.get("/", getPacketTypes);

export default router