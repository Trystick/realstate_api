import express from "express";
import { createPost, deletePost, getPost, getPosts, getPostsByCategory, getRandomPosts, updatePost } from "../controller/post.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/:postcategoryid", verifyAdmin, createPost);
//Update
router.put("/:id", verifyAdmin, updatePost);
//Delete
router.delete("/:id/:postcategoryid", verifyAdmin, deletePost);
//Get
router.get("/find/:id", getPost);
//GetAll
router.get("/", getPosts);

router.get('/postCategory/:id', getPostsByCategory);

router.get('/randomposts', getRandomPosts);

// router.get("/projectsix", getProjectsSix);

// router.get("/projectthree", getProjectsThree);

// router.get("/projects/:name", getProjectByName);

// router.get('/project/:search', getProjectByNameOrLocation);

export default router