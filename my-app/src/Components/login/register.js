import React from "react";
import loginImg from "../../login.svg";
import { withRouter } from "react-router-dom";
import Main from "../Main"
import { Redirect } from 'react-router-dom'
import axios from "axios"


export class Register extends React.Component
{
    
    IP= "52.14.172.12";
    
    constructor(props)
    {
        super(props);
        this.state = {username:'username', nume:"nume",prenume:"prenume",password:"parola",statut:" "};
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        
        
        this.setState({redirect:false});
        console.log(this.state);
        this.setState({pathname:"/user@"+this.state.username});
        
        
        const user = this.state;
        
        axios.post(`http://${this.IP}:8080/api/user`,user).then(res => {
        console.log("succes"); 
        
        window.localStorage.setItem("USER", JSON.stringify(this.state)) //salvez in localstorage user-ul
        
        this.setState({redirect:true});
        this.props.history.push("/");
        this.props.history.push(this.state.pathname);}).catch(err => {
            
            console.log("Eroare post")
            console.log(err);
            window.alert("Datele nu respecta conditiile")
        })
        
  }
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.pathname}/> //routing catre un component cu path-ul = /user@username - componenta va fi aceeasi
    }
  }
    
    
    render()
    {
        return(
            
        <div className = "base-container" ref= {this.props.containerRef}>
        <div className="header">Register</div>
        <div className = "content">
                {this.renderRedirect()}
            <div className = "image">
             <img src={loginImg} />
            </div>
            <div className = "form">
            
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type = "text" onChange={(input)=>this.setState({username:input.target.value})} name="username" placeholder="Email Address"/>
                </div>
                <div className="form-group">
                <label htmlFor="nume">Nume</label>
                <input type = "text" onChange={(input)=>this.setState({nume:input.target.value})} name="nume" placeholder="Nume"/>
                </div>
                <div className="form-group">
                <label htmlFor="prenume">Prenume</label>
                <input type = "text"onChange = {(input)=> this.setState({prenume:input.target.value})} name="prenume" placeholder="Prenume"/>
                </div>
            
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type = "password" onChange={(input)=>this.setState({password:input.target.value})} name="password" placeholder="Password"/>
                </div>
                
            </div>
            
        </div>
        
        <div className = "footer">
            <button type="button" className="btn" onClick = {this.handleClick}>Register</button>
             
        </div>
        
        </div>
    );}
    
}

export default withRouter(Register)


