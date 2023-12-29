import express from "express";
import { createPayment, deletePayment, getPayment, getPayments, updatePayment } from "../controller/payment.js";

import {verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createPayment);
//Update
router.put("/:id", verifyAdmin, updatePayment);
//Delete
router.delete("/:id", verifyAdmin, deletePayment);
//Get
router.get("/find/:id", verifyAdmin, getPayment);
//GetAll
router.get("/", verifyAdmin, getPayments);

export default router