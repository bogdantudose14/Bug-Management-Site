
const{ Project } = require("./../Databases/models")

const project = 
{
    create: async(project) => 
    {
        try {const res = await Project.create(project);
        console.log("res din service",res);
        return res;}
        catch(err)
        {
            throw new Error("Eroare la crearea proiectului")
        }
    },
    
    getAll: async () => {
        try {
            const projects = await Project.findAll();
            return projects;
            
        } catch(err) {
            throw new Error(err.message);
        }
    },
    getAllProjectsforUser: async (username) => {
        try {
            const projects = await Project.findAll({where:{USERUsername:username}});
            return projects;
            
        } catch(err) {
            throw new Error(err.message);
        }
    },
    
    updateProjectStatusByProjectName : async(projectname, repomodif,echipamodif) => 
    {   
        try{
            const project = await Project.update({linkRepository:repomodif,denumireEchipa:echipamodif},{where:{denumireProiect:projectname}});
            return project;
        }
        catch(err){
            
            console.log("Eroare modificare proiect");
        }
        
    }
    
    
    
}

module.exports = project;