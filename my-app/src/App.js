import React from 'react';

import './App.scss';
import Login from "./Components/login/index"
import Register from "./Components/login/register"

import {HashRouter as Router, Switch,Route} from "react-router-dom";
import Main from "./Components/Main";


class App extends React.Component {
  
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      isLogginActive: true,
      
    };
    
  }
  
  handleChangepage(pathrecv)
  {
    
    console.log(pathrecv)
    //this.setState((prevState)=>{pathreceived:prevState.pathrecv});
    this.setState({path:pathrecv});
   
  }
  
  changeState()
  {
    const {isLogginActive} = this.state;
    if(isLogginActive)
    {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    }
    else
    {
       this.rightSide.classList.add("right");
      this.rightSide.classList.remove("left");
    }
    
    this.setState((prevState) => ({ isLogginActive: !prevState.isLogginActive}))
  }
  
  render()
  
  {
    const {isLogginActive}=this.state;
    const current = isLogginActive ? "Register" : "Login"//if we are in the login form currently, we are going to display the register one
    const currentActive = isLogginActive ? "Login":"Register"
    
   
    
    //if login is being rendered , putting the reference into current attribute
    //same for Register
    return (
      
       <Router>
       
       <Switch>
       
       <Route path="/:item" component = {Main} />
    
       <Route path = "/" exact={true} render = { () => {
       
       // routa spre container-ul cu login/register
       return (
      <div className="App">
        <div className="login">
          <div className="container">
          {isLogginActive && <Login history={this.props.history} containerRef = {(ref) => this.current = ref}/>} 
          {!isLogginActive && <Register history={this.props.history} onChangePage={(pathrecv)=>this.handleChangepage(pathrecv)} containerRef = {(ref) => this.current = ref} />} 
          
          </div>
          
          <RightSide current = {current} containerRef={(ref) => this.rightSide = ref} onClick = {this.changeState.bind(this)}/> 
          
          </div>
      </div>
      
            );
         
       }                                        }/>
       
      </Switch>
      </Router>
      )
  }
  
}

const RightSide = props =>
{
  return <div className="right-side" ref = {props.containerRef} onClick = {props.onClick}>
  
  <div className="inner-container">
  
    <div className="text">{props.current}</div>
  
  </div>
  </div>
}

export default App;
