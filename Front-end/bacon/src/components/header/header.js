import React from 'react';
import {NavLink, Link} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
    logIn(){
        window.location = "http://localhost:3001/login"
    }
    logOut = async () => {
        //window.location = "http://localhost:3001/registration"
        const MySwal = withReactContent(Swal)
        const { value: formValues } = await MySwal.fire({
            title: 'Multiple inputs',
            html:
              '<p>Your name:<p>' +
              '<input id="swal-input1" class="swal2-input">' +
              '<p>Your email:<p>' +
              '<input id="swal-input2" class="swal2-input">' +
              '<p>Your password:<p>' +
              '<input id="swal-input3" class="swal2-input">',
            focusConfirm: false,
            preConfirm: () => {
              return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value
              ]
            }
          })
          
          if (formValues) {
            MySwal.fire(JSON.stringify(formValues))
          }
    }

    componentDidMount(){
        console.log(this.props.isLogin);
        document.getElementById("nav-header").style.display = "none";
        document.getElementById("btn-header").style.marginLeft = "400px";
        if(this.props.isLogin=="true"){
            console.log("Logged")
            document.getElementById("btn-login").style.display = "none";
            document.getElementById("btn-signup").style.display = "none";
            document.getElementById("btn-user").style.display = "block";
        } else {
            document.getElementById("btn-login").style.display = "block";
            document.getElementById("btn-signup").style.display = "block";
            document.getElementById("btn-user").style.display = "none";
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
                    <div onClick={() => this.logIn()} id="btn-login" className="header-button button-login">
                        <p>Log in</p>
                    </div>
                    <div onClick={() => this.logOut()} id="btn-signup" className="header-button button-signup">
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