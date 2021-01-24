import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

export default class Admin extends Component {
    constructor(props){
        super(props);
        const token = localStorage.getItem("token");
        //nếu muốn  logout thì removeItem("token");
        let  loggedIn = true;
        if(token == null){
            loggedIn = false;
        }
        this.state = {
            loggedIn
        }
    }
    render() {
        if(this.state.loggedIn === false){
            return <Redirect to="/"></Redirect>
        }
        return (
            <div>
                <h1>Admin Page</h1>
            </div>
        )
    }
}
