import express from "express";
import { createCategoryLandSale, deleteCategoryLandSale, getCategoryLandSale, getCategoryLandSales, updateCategoryLandSale } from "../controller/categorylandsale.js";


import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createCategoryLandSale);
//Update
router.put("/:id", verifyAdmin, updateCategoryLandSale);
//Delete
router.delete("/:id", verifyAdmin, deleteCategoryLandSale);
//Get
router.get("/:id", getCategoryLandSale);
//GetAll
router.get("/", getCategoryLandSales);

export default router