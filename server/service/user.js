const{ User } = require("./../Databases/models")

const user = {
    
    create: async(user) =>{
        
        try{
            const result = await User.create(user);
            return result;
            
        }
        
        catch(err){
            throw new Error(err.message)
        }
    },
    getAll: async () => {
        try {
            const users = await User.findAll();
            return users;
        } catch(err) {
            throw new Error(err.message);
        }
    },
    
    getByUsernameandPassword: async(username,password) => 
    {
        try {
           // const users = await User.findAll({where:{username:username}});
             const users = await User.findAll({where:{username:username , password:password}});
            return users;
            
        }
        catch(err){
            
            console.log("eroare la cautare")
            throw new Error(err.message);
        }
        
        
    },
    
    updateUserStatusByUsername : async(username,valoareStatut) => 
    {   
        try{
            const user = await User.update({statut:valoareStatut},{where:{username:username}});
            return user;
        }
        catch(err){
            
            console.log("Eroare getbyUsername");
        }
        
    }
} 


module.exports=user;