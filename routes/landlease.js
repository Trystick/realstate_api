import express from "express";
import { approveLandLease, createLandLease, deleteLandLease, getLandLease, getLandLeases, getLandLeasesByUser, getLandLeasesUser, getLandLeaseThree, getRandomLandLeases, updateLandLease } from "../controller/landlease.js";

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

router.get("/userlandlease", getLandLeasesUser);

router.get("/landleasethree", getLandLeaseThree);

router.get('/randomlandleases', getRandomLandLeases);

router.get('/user/:userId', getLandLeasesByUser);

router.post('/approve/:id', approveLandLease);

export default router