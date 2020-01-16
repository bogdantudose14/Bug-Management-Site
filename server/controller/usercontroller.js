const userService = require("./../service/user");
const projectService = require("./../service/project")
const bugService = require("./../service/bug")

const createUser = async(req,res,next) =>{
    const user = req.body;
    if(user.username && user.nume && user.prenume && user.password)
    {
        try{const result = await userService.create(user);
        
        res.status(201).send({ message : "user added successfully"});}
        catch(err)
        {
            res.status(404).send({err})//message : "invalid user credentials"})
        }
    }
    else
    {
        res.status(400).send({message : "invalid user credentials - field missing"})
    }
    
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAll();
        res.status(200).send(users);
    } catch(err) {
        res.status(500).send({
            message: `Error occured: ${err.message}`
        });
    }
}

const getUsersByUsernameandPassword = async(req,res,next) => 
{
    
    try{
        const username = req.body.username;
        const password = req.body.password;
        if(username && password)
        {
            
            try
            {
                const users = await userService.getByUsernameandPassword(username,password);
                res.status(200).send(users)
            }
            catch(err)
            {
                res.status(500).send({message:`Err occured: ${err.message}`})
            }
        }
        else
        {   
            res.status(400).send({message:"No username found"})
        }
    }
    catch(err)
    {
        res.status(500).send({message:`Error occured: ${err.message}`})
    }
    
}

const getUsersByUsername = async(req,res,next) => 
{
    
    try{
        const username = req.body.username;
        
        if(username)
        {
            
            try
            {
                const users = await userService.getByUsername(username);
                res.status(200).send(users)
            }
            catch(err)
            {
                res.status(500).send({message:`Err occured: ${err.message}`})
            }
        }
        else
        {   
            res.status(400).send({message:"No username found"})
        }
    }
    catch(err)
    {
        res.status(500).send({message:`Error occured: ${err.message}`})
    }
    
}


const createProject = async(req,res,next) =>{
    
    
    const proj = {"denumireProiect":req.body.denumireProiect,"linkRepository":req.body.linkRepository,"denumireEchipa":req.body.denumireEchipa, "USERUsername":req.body.USERUsername};
    
    //console.log(proj);
    
    if(proj.denumireProiect && proj.linkRepository && proj.denumireEchipa)
    {
        try{
            const result = await projectService.create(proj);
        res.status(201).send({ message : "project added successfully"});}
        catch(err)
        {
            res.status(404).send({message:"invalidProd"})//message : "invalid user credentials"})
        }
    }
    else
    {
        res.status(400).send({message : "invalid project"})
    }
    
}

const updateStatus = async(req,res,next) =>
{
    try
    {
        const result = await userService.updateUserStatusByUsername(req.body.usernametoupdate,req.body.statut);
        
        res.status(201).send({message:"user updated successfully"});
    }
    catch(err)
    {
        res.status(400).send({message:"wasn't able to update status"});
    }
}

const getAllProjects = async (req, res, next) => {
    try {
        const projs = await projectService.getAll();
        res.status(200).send(projs);
    } catch(err) {
        res.status(500).send({
            message: `Error occured: ${err.message}`
        });
    }
}

const getAllProjectsforUser = async (req, res, next) => {
    try {
        const projs = await projectService.getAllProjectsforUser(req.params.Username);
        console.log(projs);
        res.status(200).send(projs);
    } catch(err) {
        res.status(500).send({
            message: `Error occured: ${err.message}`
        });
    }
}

const createBug = async(req,res,next) =>{
    const bug = req.body;
    console.log("bug ul", bug);
    if(bug.severitate && bug.prioritate && bug.descriere)
    {
        try{const result = await bugService.create(bug);
        
        res.status(201).send({ message : "bug added successfully"});}
        catch(err)
        {
            res.status(404).send({err})
        }
    }
    else
    {
        res.status(400).send({message : "invalid bug credentials - field missing"})
    }
    
}

const getAllBugs = async (req, res, next) => {
    try {
        const bugs = await bugService.getAll();
        res.status(200).send(bugs);
    } catch(err) {
        res.status(500).send({
            message: `Error occured: ${err.message}`
        });
    }
}

const getAllBugsforProject = async (req, res, next) => {
    try {
       
        
        const bugs = await bugService.getAllBugsForProject(req.params.ProjectName);
        res.status(200).send(bugs);
    } catch(err) {
        
        res.status(500).send({
            
            message: `Error occured: ${err.message}`
        });
    }
}

const getAllBugsforUser = async (req, res, next) => {
    try {
       const bugsTotal = [];
        
        const projects = (await projectService.getAllProjectsforUser(req.params.Username)).map(proj=>proj.dataValues);

         for (var i=0;i<projects.length;i++)
         {
             var bugs = await bugService.getAllBugsForProject(projects[i].denumireProiect);
             bugsTotal.push(...bugs);// spread operator pentru a pune elementele din lista separat, nu ca array
         }
         
        res.status(200).send(bugsTotal);
        
    } catch(err) {
        
        res.status(500).send({
            
            message: `Error occured: ${err.message}`
        });
    }
}

const updateProject = async(req,res,next) =>
{
    try
    {
        const result = await projectService.updateProjectStatusByProjectName(req.body.projectname,req.body.repomodif, req.body.echipamodif);
        
        res.status(201).send({message:"user updated successfully"});
    }
    catch(err)
    {
        res.status(400).send({message:"wasn't able to update status"});
    }
}



module.exports = { createUser,getAllUsers,getUsersByUsernameandPassword,getUsersByUsername,createProject,getAllProjects,getAllProjectsforUser,updateStatus,createBug,getAllBugs,getAllBugsforProject,getAllBugsforUser,updateProject};