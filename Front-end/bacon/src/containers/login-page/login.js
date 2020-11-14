import React, { Component } from 'react'
import './login.css'


class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.state={
            username: '',
            password: ''
        }
     }  

    getValue() {
      alert("Username: " + this.state.username + " - Password: " + this.state.password);
      //this.props.isLogin = true;
    }

    handleUsernameChange = (e) => {   
        this.setState({username:e.target.value})
    }
    handlePasswordChange = (e) => {   
        this.setState({password:e.target.value})
    }

    handleSubmit = (e) => {
        console.log(this.state)
    }
    render(){
      return(
        <div id="loginform">
          <FormHeader title="huhu" />
          <Form onSubmit={this.handleSubmit} handleUNFunc={this.handleUsernameChange} handlePWFunc={this.handlePasswordChange}/>
          <div id="button" className="row" >
            <button onSubmit={this.handleSubmit}
              onClick={ () => {this.getValue(); this.props.isLogin(true)} }
            >Submit</button>
        </div>
          <OtherMethods />
        </div>
      )
    }
  }
  
  const FormHeader = props => (
      <h2 id="headerTitle">{props.title}</h2>
  );
  
  
  const Form = props => (
     <div>
       <FormInput description="Username" placeholder="Enter your username" type="text" handleFunc={props.handleUNFunc}/>
       <FormInput description="Password" placeholder="Enter your password" type="password" handleFunc={props.handlePWFunc}/>
       {/* <FormButton title="Log in"/> */}
     </div>
  );
  

  
  const FormInput = props => (
    <div className="row">
      <label>{props.description}</label>
      <input type={props.type} placeholder={props.placeholder} onChange={props.handleFunc}/>
    </div>  
  );
  
  const OtherMethods = props => (
    <div id="alternativeLogin">
      <label>Or sign in with:</label>
      <div id="iconGroup">
        <Facebook />
        <Twitter />
        <Google />
      </div>
    </div>
  );
  
  const Facebook = props => (
    <a href="#" id="facebookIcon"></a>
  );
  
  const Twitter = props => (
    <a href="#" id="twitterIcon"></a>
  );
  
  const Google = props => (
    <a href="#" id="googleIcon"></a>
  );
  
  export default LoginForm