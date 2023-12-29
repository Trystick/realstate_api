import express from "express";
import { createOrder, deleteOrder, getCancelReason, getOrder, getOrders, getOrdersNewest, getOrdersUser, getSuccessfulOrdersLastMonth, getSuccessfulOrdersLastWeek, getSuccessfulOrdersToday, getTotalSuccessfulOrders, updateOrder } from "../controller/order.js";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createOrder);
//Update
router.put("/:id", verifyAdmin, updateOrder);
//Delete
router.delete("/:id", verifyAdmin, deleteOrder);
//Get
router.get("/find/:id", verifyAdmin, getOrder);
//GetAll
router.get("/", verifyAdmin, getOrders);

router.get("/get/:userId", getOrdersUser);

router.get("/last-week", verifyAdmin, getSuccessfulOrdersLastWeek);

router.get("/last-month", verifyAdmin, getSuccessfulOrdersLastMonth);

router.get("/today", verifyAdmin, getSuccessfulOrdersToday);

router.get('/total-successful-orders', verifyAdmin , getTotalSuccessfulOrders);

router.get('/newest', verifyAdmin, getOrdersNewest);

router.get('/cancelReason', verifyAdmin, getCancelReason)

export default router