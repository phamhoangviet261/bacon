import Home from './containers/home-page/homepage.js'
import LoginForm from './containers/login-page/login.js'
import {Switch, Route} from 'react-router-dom'
import React, { Component } from 'react'


class App extends React.Component { 
  state = { isLog: false}

  handleLogin = (isLog) => {
    return this.setState({isLog})
  }

  render (){
    const {isLog} = this.state;
    return (
      <div>       
        <Switch>
        <Route exact path='/' render={() => !isLog ?<LoginForm isLogin={value => this.handleLogin(value)}/>:<Home/>}></Route>
        <Route exact path='/hihi' render={()=> <h1>Hihi</h1>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
