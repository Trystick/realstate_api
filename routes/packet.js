import express from "express";

import { createPacket, deletePacket, getPacket, getPackets, updatePacket } from "../controller/packet.js";

import { verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/:packettypeid", verifyAdmin, createPacket);
//Update
router.put("/:id", verifyAdmin, updatePacket);
//Delete
router.delete("/:id/:packettypeid", verifyAdmin, deletePacket);
//Get
router.get("/find/:id", getPacket);
//GetAll
router.get("/", getPackets);

export default router