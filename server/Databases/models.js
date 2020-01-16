const configuration = require("./../config/config.json")
const Sequelize = require("sequelize")

const DB_NAME = configuration.database.database_name;
const DB_USER = configuration.database.username;
const DB_PASS = configuration.database.password;

const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASS,{
    dialect:'mysql'
});

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('c9','root','p@ss',{
//     dialect:'mysql'
// });


//connecting to database
sequelize.authenticate().then(() => {
    console.log('Database connection success!');
}).catch(err => {
    console.log(`Database connection error: ${err}`);
});

class User extends Sequelize.Model { }

User.init({
    

    
    username:
    {
        primaryKey:true,
        type:Sequelize.STRING,
        allowNull:false,
        validate:{ isEmail: true, len:{args:[4,50], msg: "Must have between 4 and 50 characters"}} 
        
    },
    
    nume:
    {
        type:Sequelize.STRING,
        allowNull:false,
        validate: {  isAlpha:true }
    },
    
    prenume:
    {
        type:Sequelize.STRING,
        allowNull:false,
        validate: {  isAlpha:true , len: {args:[2, 15], msg:"Must contain between 2 and 15 characters and only letters" }} //
        
    },
    
    
    password:
    {
        type:Sequelize.STRING,
        allowNull:false,
        validate: {
            isValidPassword(value)
            {
                if(value.length < 5 || value.charAt(0)===value.charAt(0).toLowerCase())
                {
                  throw new Error("Password must have 5 letters or more");
                }
               
            }
        }
        
    },
    
    statut:
    {
        type : Sequelize.STRING,
    },
    
   
    
    
},
 
{
    sequelize,
    modelName: 'USERS',
     timestamps: false,
});



class Project extends Sequelize.Model { }

Project.init({
    
    
    denumireProiect:
    {
        type:Sequelize.STRING,
         primaryKey:true,
        allowNull:false,
        validate:{ len:{args:[3,50], msg: "Must have between 3 and 50 characters"}} 
        
    },
    
    
    linkRepository:
    {
        type:Sequelize.STRING,
        allowNull:false,
        validate: { len: {args:[3, 60], msg:"Must contain between 3 and 60 characters" }}
    },
    
    denumireEchipa:
    {
        type:Sequelize.STRING,
        allowNull:false,
        validate:{ len:{args:[3,50], msg: "Must have between 3 and 50 characters"}} 
        
    },
    
   
},
{
    sequelize,
    modelName: 'PROJECTS',
    timestamps: false,
});

class Bug extends Sequelize.Model { }

Bug.init({
    
    denumireBug:
    {
        type:Sequelize.STRING,
        primaryKey:true,
        
    },
    
    severitate:
    {
        type:Sequelize.STRING,
        allowNull:false,
     
        
    },
    
    prioritate:
    {
        type:Sequelize.STRING,
        allowNull:false,
        validate: { len: {args:[3, 8], msg:"Must contain between 3 and 8 characters"  }}
    },
    
    descriere:
    {
        type:Sequelize.STRING,
        allowNull:false,
        validate: { len: {args:[5, 20], msg:"Must contain between 5 and 20 characters" }}
    },
    
    link:
    {
        type:Sequelize.STRING,
        allowNull:false,
        validate: { len: {args:[5, 60], msg:"Must contain between 5 and 60 characters" }}
    }
    
},
{
    sequelize,
    modelName: 'BUGS',
    timestamps: false,
});


Project.belongsTo(User);
User.hasMany(Project);
Bug.belongsTo(Project);
Project.hasMany(Bug);
Project.sync();
User.sync();
Bug.sync();

// User.sync({force: true});
// Project.sync({force: true});
// Bug.sync({force:true})


module.exports = {
    sequelize,
    User,
    Project,
    Bug
}