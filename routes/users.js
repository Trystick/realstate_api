import express from "express";
import {updateUser, deleteUser, getUser, getUsers, updateUserNoPass, getAdmins, getUsersOnly} from "../controller/user.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//Update
router.put("/:id", verifyUser, updateUser);

router.put("/nopass/:id", verifyUser, updateUserNoPass);
//Delete
router.delete("/:id", verifyUser, deleteUser);
//Get
router.get("/:id", getUser);
//GetAll
router.get("/", verifyAdmin, getUsers);

router.get("/admins/admins", verifyAdmin, getAdmins);// phải để gấp đôi trường trong router không là lỗi Cast

router.get("/users/users", verifyAdmin, getUsersOnly);


export default router