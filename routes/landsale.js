import express from "express";
import { createLandSale, deleteLandSale, getLandSale, getLandSales, getLandSalesByUser, getLandSaleThree, getRandomLandSales, getWeeklyLandSaleAndLease, updateLandSale } from "../controller/landsale.js";


import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/:categorylandsaleid", verifyUser, createLandSale);
//Update
router.put("/:id", verifyUser, updateLandSale);
//Delete
router.delete("/:id/:categorylandsaleid", verifyUser, deleteLandSale);
//Get
router.get("/find/:id", getLandSale);
//GetAll
router.get("/", getLandSales);

router.get("/landsalethree", getLandSaleThree);

router.get('/randomlandsales', getRandomLandSales);

router.get('/user/:userId', getLandSalesByUser);

router.get('/weekly-land-sale-lease/:year/:month', getWeeklyLandSaleAndLease);

export default router