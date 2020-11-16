import React from 'react';
import {NavLink, Link} from 'react-router-dom'

import './header.css'
import './header-style.js'
// import { NavLink } from 'react-router-dom';
class Header extends React.Component{
    constructor(props){
        super(props)
    }

    myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
      }

    render(){
        return(
        <div className="header">
            <div className="header-logo">
            <h1>BACON</h1>
            </div>
            <div className="containerflex" title="" data-toggle="tooltip" data-placement="top">
                <div className="flexitem">FOR ENTERPRISE</div>
                <div className="flexitem">FOR STUDENT</div>
                <div className="flexitem">NOTIFICATION</div>
                <div className="dropdown">
                        <button onClick={this.myFunction} className="dropbtn">USER</button>
                        <div id="myDropdown" className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>              
            </div>
        </div>
    )
    }
}

export default Header;