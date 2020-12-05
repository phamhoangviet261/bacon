import React, {Component} from 'react' 
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
//import Row from 'react-bootstrap/Row'

import './script.js'
import './listCourse.css'
import Pic1 from '../../assets/images/download.jfif'
class listCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
            btnBackground: "transparent"
        }
    };
    

    onClickMe() {
        alert('hhh');
    }

    render() {
        return (
            <div>
                <div class="container">
                    <main class="grid">
                        <article>
                        <img src="https://picsum.photos/600/400?image=1083" alt="Sample photo"/>
                        <div class="text">
                            <h3>Japanese for Beginners</h3>
                            <h4>Saint Petersburg State University</h4>                           
                        </div>
                        </article>
                        <article>
                <img src="https://picsum.photos/600/400?image=1063" alt="Sample photo"/>
                <div class="text">
                    <h3>How to Meditate ?</h3>
                    <h4>New York University</h4>
                    <div class="actionLoop visible-lg">
				        <a onclick={this.onClickMe} class="styleBtnBuy notClick" >MUA NGAY</a>
				    </div>
                </div>
                </article>
                <article>
                <img src="https://picsum.photos/600/400?image=1056" alt="Sample photo"/>
                <div class="text">
                    <h3>Michigan Programming for Everybody</h3>
                    <h4>University of Michigan </h4>                
                </div>
                </article>
                <article>
                <img src="https://picsum.photos/600/400?image=1050" alt="Sample photo"/>
                <div class="text">
                    <h3>Web Development</h3>
                    <h4>University of Michigan </h4>                 
                </div>
                </article>
                <article>
                <img src="https://picsum.photos/600/400?image=1041" alt="Sample photo"/>
                <div class="text">
                    <h3>Fundamentals of Finance</h3>
                    <h4>University of Michigan </h4>                   
                </div>
                </article>
                <article>
                <img src="https://picsum.photos/600/400?image=1015" alt="Sample photo"/>
                <div class="text">
                    <h3>The Science of Well Being</h3>
                    <h4>University of Michigan </h4>                 
                </div>
                </article>
            </main>
            </div>
                        
                    {/* <div className="lc">
                        <div className="lc" id="lc1">
                            <img src="../../assets/images/download.jfif"></img>
                            <h2>Japanese for Beginners</h2>
                        </div>
                        <div className="lc" id="lc2">How to Meditate ?</div>       
                        <div className="lc" id="lc3">Michigan Programming for Everybody</div>
                    </div>
                    <div className="lc">
                        <div className="lc" id="lc4">Web Development</div>
                        <div className="lc" id="lc5">Fundamentals of Finance</div>
                        <div className="lc" id="lc6">The Science of Well Being</div>
                    </div>   
                       */}
            </div>
        )
    }
}

export default listCourse