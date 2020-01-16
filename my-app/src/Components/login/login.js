import React from "react";
import loginImg from "../../login.svg";
import {withRouter}  from "react-router";
import { Redirect } from 'react-router-dom';
import axios from "axios"

 class Login extends React.Component
{
    
     IP= "52.14.172.12";
     
    constructor(props)
    {
        super(props);
        this.state = {username:'username',password:"parola"};
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        
        
    }
    
    handleClick()
    {
        console.log("Props",this.props)
        
        this.setState({redirect:false});
        
        this.setState({pathname:"/user@"+this.state.username});
        const username = this.state.username;
        const password = this.state.password;
        
        window.localStorage.setItem("USER", JSON.stringify(this.state)) ;

        axios.post(`http://${this.IP}:8080/api/user/username`,{username:username,password:password}).then(res => {
            console.log("user found");
            console.log(res);
            if(res.data.length===0)
                {
                window.alert("No user found")
                return;
                }
                
            this.setState({redirect:true});
            this.props.history.push("/");
            this.props.history.push(this.state.pathname);
              
    
        }).catch(err => {console.log(err);})
        
    }
    
    handleChangeUserName(event)
    {
        this.setState({
            
            username:event.target.value
            
        })
    }
    
    handleChangePassword(event)
    {
        this.setState({
            
            password:event.target.value
            
        })
    }
    
     renderRedirect = () => {
    if (this.state.redirect) {
    
      return <Redirect to={this.state.pathname}/> //routing catre un component cu path-ul = /username
    }
  }
    
    render()
    {
        return(
       
        <div className = "base-container" ref= {this.props.containerRef}>
        <div className="header">Login</div>
        <div className = "content">
        {this.renderRedirect()}
            <div className = "image">
             <img src={loginImg} />
            </div>
            <div className = "form">
            
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type = "text" name="username" placeholder="Email Address" onChange={this.handleChangeUserName}/>
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type = "password" name="password" placeholder="Password" onChange={this.handleChangePassword}/>
                </div>
                
            </div>
            
        </div>
        
        <div className = "footer">
            <button type="button" className="btn" onClick={this.handleClick}>Login</button>
        </div>
        
        </div>
    );}
    
}

export default withRouter(Login)

