import React from "react"
import {withRouter} from "react-router-dom"
//import image from 'ok.png';
import image from "../ok.png";
import axios from "axios";
import "./login/style.scss";


class Main extends React.Component
{
    IP= "52.14.172.12";
     
    constructor(props)
    {
        super(props)
        
        this.state = {  inputs:[] , inputsforTester:[], isButtonInregistrareDisabled:false,isButtonAdaugareDisabled:false,isButtonModificareDisabled:true, inputsforBugs:[],bugpriority:"LOW",
            inputsforModify:[],
            bugseverity:"Ignorable",
            ProjectNameToBeRegistered: "",
            ProjectRepoToBeRegistered: "",
            ProjectTeamNameToBeRegistered: "",
            ProjectRepoToBeRegisteredforModify:"",
            ProjectTeamNameToBeRegisteredforModify:"",
            BugDescription:"",
            BugLink:"",
            user : JSON.parse(window.localStorage.getItem("USER")),
            projectsList:[],
            ProjectNameForBug:"",
            contorBug: 0,
            AvailableProjects:[],
            TotalBugsListforMP:[]
            
            
        }
        this.addProject = this.addProject.bind(this);
        this.addAsTester = this.addAsTester.bind(this);

    }
    
    addProject = ev =>
    {  
        const objForUpdateUserStatus = {usernametoupdate:this.state.user.username, statut:"MP"}

         axios.put(`http://${this.IP}:8080/api/user`,objForUpdateUserStatus).then(res => {console.log(`succes update user ${objForUpdateUserStatus.usernametoupdate} to MP`)}
                                                                                     ).catch(err =>{console.log("Eroare update user din Main");console.log(err);});
                  
        this.setState({isButtonInregistrareDisabled: true});
        this.setState(prev => ({inputs :  ["Hi"]}))  
        this.setState({inregistrareclicked: true})
        this.fetchProjects();
            
    }
    
    addAsTester = ev =>
    {  
        this.setState({isButtonAdaugareDisabled: true});
        this.setState(prev => ({inputsforTester :  ["Hi"]}))  
        
    }
    
    handleClickModifyProject = ev => 
    {
        this.setState(prev => ({inputsforModify:["Hello"]}))
    }
    
    fetchProjects = () =>
    {
        axios.get(`http://${this.IP}:8080/api/project/${this.state.user.username}`).then(
            res => { console.log("Projects",res.data); this.setState({projectsList:res.data}) }
            
            ).catch(err => {
            
            console.log("Eroare post project din Main")
            console.log(err);
            
        });
    }
    
    
    handleTesterClick = ev => 
    {
        this.setState(prev => ({inputsforBugs: ["Hi"]}))
        const objForUpdateUserStatus = {usernametoupdate:this.state.user.username, statut:"TST"}
        axios.put(`http://${this.IP}:8080/api/user`,objForUpdateUserStatus).then(res => {console.log(`succes update user ${objForUpdateUserStatus.usernametoupdate} to TST`)}
                                                                                    ).catch(err =>{console.log("Eroare update user din Main");console.log(err);});
    }
    
    handleChangeBugPriority = (event) => {
        this.setState({bugpriority: event.target.value});
    }
    
    handleChangeBugSeverity = (event) => {
        this.setState({bugseverity: event.target.value});
    }
    
    handleChangeProjectNameToBeRegistered = (event) => 
    {
        this.setState({ ProjectNameToBeRegistered: event.target.value,  })
    }
    
     handleChangeProjectRepoToBeRegistered = (event) => 
    {
        this.setState({ProjectRepoToBeRegistered: event.target.value })
    }
    
    handleChangeProjectRepoToBeRegisteredModify = (event) => 
    {
        this.setState({ProjectRepoToBeRegisteredforModify:event.target.value})
    }
    
     handleChangeProjectRTeamNameToBeRegistered = (event) =>
    {
        this.setState({ProjectTeamNameToBeRegistered : event.target.value, ProjectTeamNameToBeRegisteredforModify: event.target.value })
    }
    
    handleChangeProjectTeamNameToBeRegisteredModify = (event) => 
    {
        this.setState({ProjectTeamNameToBeRegisteredforModify:event.target.value})
    }
    
    
    handleClickRegisterProject = (event) => 
    {
        // const objForUpdateUserStatus = {usernametoupdate:this.state.user.username, statut:"MP"}

        // axios.put(`http://${this.IP}:8080/api/user`,objForUpdateUserStatus).then(res => {console.log(`succes update user ${objForUpdateUserStatus.usernametoupdate} to MP`)}
        //                                                                             ).catch(err =>{console.log("Eroare update user din Main");console.log(err);});
                                                                                    
        const Project = {denumireProiect:this.state.ProjectNameToBeRegistered, linkRepository: this.state.ProjectRepoToBeRegistered, denumireEchipa: this.state.ProjectTeamNameToBeRegistered, USERUsername: this.state.user.username };
        console.log(Project);
        
        axios.post(`http://${this.IP}:8080/api/project`,Project).then(res => {console.log("succes adaugare proiect");this.fetchProjects();}).catch(err => {
            
            console.log("Eroare post project din Main")
            console.log(err);
            
        })
        
    }
    
    handleClickShowProjects = (event) => 
    {
        axios.get(`http://${this.IP}:8080/api/project`).then(res => {
            
            this.setState({AvailableProjects:res.data})
            
        }).catch(err => {console.log("Eroare get Projects"); console.log(err);
            
        })
    }
    
    IncrementItem = () => {
    this.setState({ contorBug: this.state.contorBug + 1 });
  }
    
    handleChangeBugDescription = (event) => 
    {
        this.setState({BugDescription:event.target.value})
    }
    
    handleChangeBugLink = (event) => 
    {
        this.setState({BugLink:event.target.value})
    }
    
    handleClickSubmitModify =(event) =>
    {
        const objModify = {
            projectname:this.state.ProjectNameForBug,
            repomodif:this.state.ProjectRepoToBeRegisteredforModify,
            echipamodif:this.state.ProjectTeamNameToBeRegisteredforModify
        }
        
        console.log(objModify);
        
        axios.put(`http://${this.IP}:8080/api/project`,objModify).then(res => {console.log(`succes updating project ${this.state.ProjectNameForBug}`)}
                                                                                    ).catch(err =>{console.log("Eroare update project din Main");console.log(err);});
    }
                
   handleClickAddBug = (event) => 
   {
       

       //axios.get(`http://${this.IP}:8080/api/bug/${this.state.ProjectNameForBug}`).then(res => console.log(res.data)).catch(err=>{console.log(err);});
       //axios.get(`http://${this.IP}:8080/api/bugs/${this.state.user.username}`).then(res => console.log(res.data)).catch(err=>{console.log(err);});

        
       const Bug = { denumireBug:`Bug-ul ${this.state.contorBug + 1} inregistrat de user-ul ${this.state.user.username} pentru proiectul : ${this.state.ProjectNameForBug}`,severitate:this.state.bugseverity, prioritate: this.state.bugpriority, descriere:this.state.BugDescription, 
                        link: this.state.BugLink,PROJECTDenumireProiect:this.state.ProjectNameForBug}
       
       console.log(Bug);
       
       axios.post(`http://${this.IP}:8080/api/bug`,Bug).then(res => console.log("succes adaugare bug")).catch(err => {
            
            console.log("Eroare post bug din Main")
            console.log(err);
            
        })
       }
   
   handleProjectClick = (denumireProiect) => 
    
    {
        this.setState({ProjectNameForBug:denumireProiect})
        this.setState({isButtonModificareDisabled:false})
        
    }
    
    handleProjectNameForBug = (event) =>
    {
        this.setState({ProjectNameForBug:event.target.value})
    }
   
   handleClickShowBug = (event) =>
   {
             axios.get(`http://${this.IP}:8080/api/bugs/${this.state.user.username}`).then(res => {console.log(res.data); this.setState({TotalBugsListforMP:res.data})})
             .catch(err=>{console.log(err);});
   }
    
    
    render()
    {
        const data = JSON.parse(window.localStorage.getItem("USER")); // iau user-ul curent din localstorage


    return (
        <div>
        
         <br></br>
         <br></br>
         
        <div>
        
        <button disabled={this.state.isButtonAdaugareDisabled}  style={{fontFamily:"Century Gothic", fontSize:"18px", height: 100 , width: 200, marginLeft:"10px"  }} onClick = {this.addProject} > Inregistrare Proiect</button>
        
        <button disabled={this.state.isButtonInregistrareDisabled} style={{fontFamily:"Century Gothic",fontSize:"18px",  height: 100 , width: 200, marginLeft:"200px"  }} onClick = {this.addAsTester} > Adaugare ca tester</button>
        
        </div>
        
      
        {this.state.inputsforTester.map(node => <div style = {{position:"fixed",marginLeft:"250px"}}><br></br>
                                                <button style={{marginLeft:"153px", background:"linear-gradient(to bottom, #ffffff 2%, #00003f 100%)"}} className="btn_bugs" onClick = {this.handleClickShowProjects}>Vizualizare Proiecte Disponibile</button><br></br><br></br>
                                    {this.state.AvailableProjects.map(project => <div style = {{display: "flex",justifyContent: "center",alignItems: "center"
            ,width:"400px",border: '1px solid orange',borderRadius:"5px",borderCollapse:"collapse",fontFamily: "Century Gothic", fontSize:"20", fontStyle:"italic",fontWeight:"bold",marginLeft:"100px"}} 
            onClick = {() => this.handleProjectClick(project.denumireProiect)}>{project.denumireProiect} </div>)}
                                        
                                                <label style={{marginLeft:"153px"}}>Denumire proiect: </label><input type = "text" placeholder={this.state.ProjectNameForBug} onChange={this.handleProjectNameForBug} value={this.state.ProjectNameForBug}/>
                                                 <button style = {{marginLeft:"15px",height: 33 , width: 35, backgroundImage:`url(${image})`}} onClick = {this.handleTesterClick}></button><br></br>
                                                 
                                                 <br></br><br></br>
                                                 </div>
                                                 )}
                                                
                                                
       
        {this.state.inputsforBugs.map(node => <div style = {{marginLeft:"850px", marginTop:"-150px"}}><br></br><h1 style = {{height:"50"}}>Inregistrare Bug</h1><br></br>
                                                
                                                <p>Proiect: <strong style={{marginLeft:"3px",fontFamily:"Century Gothic", fontSize:"18", fontStyle:"italic"}}>{this.state.ProjectNameForBug}</strong></p>
                                                <br></br>
                                                <label>Descriere:  </label><input type="text"  onChange={this.handleChangeBugDescription} value={this.state.BugDescription}/>
                                                <br></br><br></br>
                                                <label>Link:  </label><input type="text"  onChange={this.handleChangeBugLink} value={this.state.BugLink} />
                                                <br></br><br></br>
                                                <select style = {{width:"150px", height:"30px"}} value={this.state.bugpriority} onChange={this.handleChangeBugPriority}>
                                                    <option>LOW</option>
                                                    <option>MEDIUM</option>
                                                    <option>HIGH</option>
                                                </select>
                                                <br></br><br></br>
                                                <select style = {{width:"150px",height:"30px"}} value={this.state.bugseverity} onChange={this.handleChangeBugSeverity}>
                                                    <option>Important</option>
                                                    <option>Relative</option>
                                                    <option>Ignorable</option>
                                                </select>
                                                <br></br><br></br>
                                                <button style={{marginLeft:"0px"}} className="btn_bugs" onClick ={() => {this.handleClickAddBug(); this.IncrementItem();}}>Inregistreaza Bug</button>
                                                </div>)}
        {this.state.inputs.map(node => <div><br></br><button style={{marginLeft:"10px"}} className="btn_bugs" onClick = {this.handleClickShowBug}>Vizualizare Bug-uri inregistrate</button><br></br><br></br>
                                                    <button disabled={this.state.isButtonModificareDisabled} style = {{ marginLeft:"30px",padding:"6px 24px",fontFamily:"Century Gothic", fontSize:"18px"}} onClick = {this.handleClickModifyProject}>Modificare Proiect</button>
        
                                                    <br></br><br></br>
                                                    <label>Denumire proiect: </label><input type = "text"  onChange={this.handleChangeProjectNameToBeRegistered} value={this.state.ProjectNameToBeRegistered} /><br></br><br></br>
                                                    <label>Repository: </label><input type = "text"  onChange={this.handleChangeProjectRepoToBeRegistered} value={this.state.ProjectRepoToBeRegistered}/><br></br><br></br>
                                                    <label>Denumire echipa: </label><input type = "text" onChange={this.handleChangeProjectRTeamNameToBeRegistered} value={this.state.ProjectTeamNameToBeRegistered}/>
        
        <br></br><br></br><button onClick={this.handleClickRegisterProject} style = {{marginLeft:"15px",height: 35 , width: 35, backgroundImage:`url(${image})`}}></button>
        <br></br><br></br><div style = {{marginLeft:"40px",fontFamily: "Century Gothic", fontSize:"40"}}>Lista proiecte pentru user-ul : {this.state.user.username}</div><br></br><br></br>
        {this.state.projectsList.map(project => <div style = {{display: "flex",justifyContent: "center",alignItems: "center"
            ,width:"400px",border: '1px solid orange',borderRadius:"5px",borderCollapse:"collapse",fontFamily: "Century Gothic", fontSize:"20", fontStyle:"italic",fontWeight:"bold",marginLeft:"40px"}} 
            onClick = {() => this.handleProjectClick(project.denumireProiect)}>{project.denumireProiect} </div>)}
                                            <br></br><br></br><div style = {{marginLeft:"40px",fontFamily: "Century Gothic", fontSize:"40"}}>Lista bug-uri pentru MP-ul : {this.state.user.username}</div>
                            <br></br></div>)}
                            
          
                                                
        {this.state.TotalBugsListforMP.map(bug => <div style = {{display: "flex",justifyContent: "center",alignItems: "center"
            ,width:"750px",border: '1px solid orange',borderRadius:"5px",borderCollapse:"collapse",fontFamily: "Century Gothic", fontSize:"8",marginLeft:"40px"}} >
            {bug.denumireBug} </div>
            
            )}
            
        {this.state.inputsforModify.map(node => <div style={{marginLeft:"450px", marginTop:"-505px"}}> 
                                                    <form style ={{width:"300px",border:"2px solid orange"}}>
                                                     <strong style={{fontSize:"20px",alignItems: "center",display: "flex",justifyContent: "center"}}>Modificare proiect</strong><br></br><br></br>
                                                      <label style={{fontFamily:"Century Gothic", fontSize:"18px"}}>Denumire proiect:  <strong>{this.state.ProjectNameForBug}</strong></label><br></br><br></br>
                                                      <label>Repository: </label><input type = "text"  onChange={this.handleChangeProjectRepoToBeRegisteredModify} value={this.state.ProjectRepoToBeRegisteredforModify}/><br></br><br></br>
                                                      <label>Denumire echipa: </label><input type = "text" onChange={this.handleChangeProjectTeamNameToBeRegisteredModify} value={this.state.ProjectTeamNameToBeRegisteredforModify}/><br></br><br></br>
                                                      <button style = {{ marginLeft:"30px",padding:"6px 24px",fontFamily:"Century Gothic", fontSize:"16px"}} onClick = {this.handleClickSubmitModify}>Modificare Proiect</button>
                                                      <br></br><br></br>
                                                    </form>
                                                </div>)}
        </div>
        
     
            );
    }
    
}

export default withRouter(Main);