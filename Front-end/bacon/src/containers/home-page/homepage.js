import Header from '../../components/header/header.js'
import ListCourse from '../../components/listCourse/listCourse.js'
import Page404 from '../404page/404page.js'
import Author from '../../components/author/author.js'
import Contact from '../../components/contact/contact.js'
import Course from '../../containers/course-page/coursepage.js'
import Footer from '../../components/footer/footer.js'
import LoginPage from '../login-page/login.js'
import Exam from '../../components/exam/exam.js'
import './homepage.css'
import {Link, Switch, Route, Router} from 'react-router-dom'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Payment from '../payment-page/payment.js'
import Overview from '../overview-page/overview.js'
import Admin from '../adminpage/admin.js'
const Home = () => {
    return (
    // <div>
        
    //     {/* <Header/> */}
    //     {/* <div id="banner"></div> */}
    //     {/* <Author></Author> */}
        
    //     {/* <Course></Course> */}
    //     {/* <Overview></Overview> */}
        
    //     {/* <Contact></Contact> */}
    //     {/* <Payment></Payment> */}
    //     {/* <Exam></Exam> */}
    //     <LoginPage></LoginPage>
    //     {/* <Footer></Footer> */}
        
    // </div>
    <Switch>
        <Route exact path="/">
            <LoginPage></LoginPage>
        </Route>
        <Route exact path="/home" component={Course}></Route>
        <Route exact path="/admin" component={Admin}></Route>
    </Switch>

    )
}

export default  Home
