import Header from '../../components/header/header.js'
import ListCourse from '../../components/listCourse/listCourse.js'
import Page404 from '../404page/404page.js'
import Author from '../../components/author/author.js'
import Contact from '../../components/contact/contact.js'
//mấy cái này là mình cần dùng thì mình import dô
import './homepage.css'
import {Switch, Route} from 'react-router-dom'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
// để code react thì cần import "import React, { Component } from 'react'"
// -----
// h ví dụ m code 1 component ListCourse đi nha, làm như này
//đầu tiền là tạo 1 component listCourse như t làm đó nè
// xong rồi viết mấy cái cần như y cái file bên phải
// có import React, class, render, return, trong return thì
//viết y như code html
//xong cuối cùng nhớ export default + tên
//mình xuất ra rồi thì bên file homepage mình import dô như ở trên í
// rồi mình xài bth hoy
//oke k? ok, ma m gọi cho nhanh ko, ok
//
const Home = () => {
    return (
    <div>
        <Header/>
        <div id="banner"></div>
        <ListCourse></ListCourse>
        <Author></Author>
        <Contact></Contact>
        
    </div>

    )
}

export default  Home