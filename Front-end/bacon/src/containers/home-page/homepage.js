import Header from '../../components/header/header.js'
import ListCourse from '../../components/listCourse/listCourse.js'
import Page404 from '../404page/404page.js'
import Author from '../../components/author/author.js'
import Contact from '../../components/contact/contact.js'
import Course from '../../containers/course-page/coursepage.js'
import Footer from '../../components/footer/footer.js'
import LoginPage from '../login-page/login.js'
import './homepage.css'
import {Switch, Route} from 'react-router-dom'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Payment from '../payment-page/payment.js'
const Home = () => {
    return (
    <div>
        
        <Header/>
        <div id="banner"></div>
        <Author></Author>
        
        <Course></Course>
        
        {/* <Contact></Contact> */}
        {/* <Payment></Payment> */}
        <Footer></Footer>
        {/* <LoginPage></LoginPage> */}
    </div>

    )
}

export default  Home