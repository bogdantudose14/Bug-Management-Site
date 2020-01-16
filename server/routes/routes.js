const express = require("express");
const router =  express.Router();

const {createUser,getAllUsers,getUsersByUsernameandPassword,getUsersByUsername,createProject,getAllProjects,getAllProjectsforUser,updateStatus,createBug,getAllBugs,getAllBugsforProject,getAllBugsforUser,updateProject} = require("./../controller/usercontroller");



router.post("/user", createUser);
router.get('/user', getAllUsers);
router.post('/user/username',getUsersByUsernameandPassword);
router.post("/project",createProject);
router.get("/project/:Username",getAllProjectsforUser);
router.get("/project",getAllProjects);
router.put("/user",updateStatus);
router.get("/bug/:ProjectName",getAllBugsforProject);
router.get("/bugs/:Username",getAllBugsforUser);
router.post("/bug",createBug);
router.get("/bug",getAllBugs);
router.put("/project",updateProject);


module.exports=router;