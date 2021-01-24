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

    componentDidMount(){
        console.log(this.props.isLogin);
        document.getElementById("nav-header").style.display = "none";
        document.getElementById("btn-header").style.marginLeft = "400px";
        if(this.props.isLogin=="true"){
            console.log("Logged")
            document.getElementById("btn-login").style.display = "none";
            document.getElementById("btn-signup").style.display = "none";
        }
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
            <div id="nav-header" className="containerflex" title="" data-toggle="tooltip" data-placement="top">
                <nav role="navigation" className="primary-navigation">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Work</a>
                        <ul className="dropdown">
                            <li><a href="#">Web Development</a></li>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Illustration</a></li>
                            <li><a href="#">Iconography</a></li>
                        </ul>
                        </li>           
                    </ul>
                </nav>                     
            </div>
            <div id="btn-header" className="header-button-container">
                    {/* Chỗ này để 2 cái button nè, 
                    nếu mà login rồi thì không có 2 button đó 
                    mà là button người dùng */}
                    <div id="btn-login" className="header-button button-login">
                        <p>Log in</p>
                    </div>
                    <div id="btn-signup" className="header-button button-signup">
                        <p>Sign up</p>
                    </div>
                    <div id="btn-user"
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