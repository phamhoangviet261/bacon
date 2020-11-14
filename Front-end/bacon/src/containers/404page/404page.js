
import {Switch, Route} from 'react-router-dom'
import React, { Component } from 'react'
import './404page.css'

const page404 = () => {
    return (
        <div>
            
                
            <div class="message-box">
               <h1>404</h1>
               <p>Page not found</p>
               <div class="buttons-con">
                    <div class="action-link-wrap">
                    <a onclick="history.back(-1)" class="link-button link-back-button">Go Back</a>
                    <a href="" class="link-button">Go to Home Page</a>
                    </div>
                </div>
            </div>
        </div>
        
        

    )
}

export default  page404