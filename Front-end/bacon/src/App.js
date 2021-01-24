import Home from './containers/home-page/homepage.js'
import Login from './containers/login-page/login.js'
import Dashboard from './containers/dashboard/dashboard.js'
import Course from './containers/course-page/coursepage.js'
import ListCourse from './components/listCourse/listCourse.js'
import Overview from './containers/overview-page/overview.js'
import Payment from './containers/payment-page/payment.js'
import Registration from './containers/register-page/register.js'
import Exam from './components/exam/exam.js'
import Book from './components/book/book.js'

import {Switch, Route, BrowserRouter, NavLink} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios';


import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
 
function App() {
  global.isLogin = false;
  const [authLoading, setAuthLoading] = useState(true);
 
  useEffect(() => {
    const token = getToken();
    console.log(token);
    if (!token) {
      return;
    }
 
    
  }, []);
 
  // if (authLoading && getToken()) {
  //   //removeUserSession();
  //   console.log("huhu");
  //   return( <div className="App">
    
  //   {/* <Course></Course> */}
  //   <Dashboard></Dashboard>
  //   </div>)
  //   //
  // }
 
  return (
    <div className="App">
      {/* <BrowserRouter> */}
        <div>
          
          <div className="content">
            <Switch>
              <Route exact path="/" component={() => <ListCourse isLogin={false} />}/>
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/course" component={Course} />
              <Route exact path="/overview" component={Overview} />
              <Route exact path="/list" component={() => <ListCourse isLogin={true} />}/>
              <Route exact path="/payment" component={Payment} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/exam" component={Exam} />
              <Route exact path="/book" component={Book} />
            </Switch>
          </div>
        </div>
      {/* </BrowserRouter> */}
      
    </div>
  );
}
 
export default App;