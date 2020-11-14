import Header from '../../components/header/header.js'
import ListCourse from '../../components/listCourse/listCourse.js'
import Page404 from '../404page/404page.js'

import {Switch, Route} from 'react-router-dom'
import React, { Component } from 'react'
const Home = () => {
    return (
    <div>
        <Header/>
        <ListCourse/>
        
    </div>

    )
}

export default  Home