import express from "express";
import { createProject, deleteProject, getProject, getProjectByName, getProjectByNameOrLocation, getProjectNear, getProjects, getProjectsSix, getProjectsThree, getRandomProjects, updateProject } from "../controller/project.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/:categoryid", verifyAdmin, createProject);
//Update
router.put("/:id", verifyAdmin, updateProject);
//Delete
router.delete("/:id/:categoryid", verifyAdmin, deleteProject);
//Get
router.get("/find/:id", getProject);
//GetAll
router.get("/", getProjects);

router.get("/projectnear", getProjectNear);

router.get("/projectsix", getProjectsSix);

router.get("/projectthree", getProjectsThree);

router.get("/projects/:name", getProjectByName);

router.get('/project/:search', getProjectByNameOrLocation);

router.get('/randomprojects', getRandomProjects);

export default router