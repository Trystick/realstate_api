import express from "express";
import { createLandLease, deleteLandLease, getLandLease, getLandLeases, getLandLeasesByUser, getLandLeaseThree, getRandomLandLeases, updateLandLease } from "../controller/landlease.js";

import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/:categorylandleaseid", verifyUser, createLandLease);
//Update
router.put("/:id", verifyUser, updateLandLease);
//Delete
router.delete("/:id/:categorylandleaseid", verifyUser, deleteLandLease);
//Get
router.get("/find/:id", getLandLease);
//GetAll
router.get("/", getLandLeases);

router.get("/landleasethree", getLandLeaseThree);

router.get('/randomlandleases', getRandomLandLeases);

router.get('/user/:userId', getLandLeasesByUser);

export default router