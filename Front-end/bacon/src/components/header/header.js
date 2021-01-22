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
    logOut(x){
        console.log("LOGOUT: " + x.toString());
        const token = localStorage.getItem("token");
        console.log(token)
        localStorage.removeItem("token");
        x = !x;
    }
    render(){
        return(
        <div className="header">
            <div className="header-logo">
            <h1>BACON</h1>
            </div>
            <div className="search-bar">
                <input type="text" name="search" placeholder="Search..."/>
            </div>
            <div className="containerflex" title="" data-toggle="tooltip" data-placement="top">
                <nav role="navigation" class="primary-navigation">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Work</a>
                        <ul class="dropdown">
                            <li><a href="#">Web Development</a></li>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Illustration</a></li>
                            <li><a href="#">Iconography</a></li>
                        </ul>
                        </li>           
                    </ul>
                </nav>                     
            </div>
            <div className="header-button-container">
                    {/* Chỗ này để 2 cái button nè, 
                    nếu mà login rồi thì không có 2 button đó 
                    mà là button người dùng */}
                    <div className="header-button button-login">
                        <p>Log in</p>
                    </div>
                    <div className="header-button button-signup">
                        <p>Sign up</p>
                    </div>
                    <div 
                    className="header-button button-user"
                    onClick={() => this.logOut(this.props.logIn)}
                    >
                        <p>Shiro</p>
                    </div>
                </div>  
        </div>
    )
    }
}

export default Header;