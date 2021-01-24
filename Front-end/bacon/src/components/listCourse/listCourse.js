import React, {Component} from 'react' 
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
//import Row from 'react-bootstrap/Row'
//import ax
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//import './script.js'
import './listCourse.css'
//import Pic1 from '../../assets/images/download.jfif'
import Pic1 from '../../assets/images/course.jpg'
import Header from '../../components/header/header.js'
class listCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
            btnBackground: "transparent"
        }
        this.viewEnroll = this.viewEnroll.bind(this);
    };

    viewEnroll(name){
        console.log("hihi");
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: <p>About this course</p>,
            text: name,
            footer: 'Copyright 2021',
            buttons: [
                'No, cancel it!',
                'Yes, I am sure!'
              ],
          }).then(function(isConfirm) {
            if (isConfirm) {
            setInterval(window.location = "http://localhost:3001/overview", 10000)}}
          );
    }

    

    render() {
        return (
            <div>
                <Header isLogin={this.props.isLogin}></Header>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
                <div className="list-course-title">Courses</div>
                 <div className="container">
                     
                    <main className="list-course-grid">
                        <article>
                        <img src="https://picsum.photos/600/400?image=1083" alt="Sample photo" className="sample-photo"/>
                        <div className="course-text">
                            <p className="text-center">Japanese for Beginners
                            <br/>Saint Petersburg State University</p>
                            <button onClick={()=>this.viewEnroll("Japanese for Beginners")} type="button" className="btn btn-outline btn-block" id="btn-enroll1">ENROLL NOW</button>
                     
                        </div>
                        </article>
                        
                        <article>
                            <img src="https://picsum.photos/600/400?image=1063" alt="Sample photo" className="sample-photo"/>
                            <div className="course-text">
                            <p className="text-center">How to Meditate ?<br/>
                                New York University</p>
                                
                                <button onClick={()=>this.viewEnroll("How to Meditate ?")} type="button" className="btn btn-outline btn-block" id="btn-enroll2">ENROLL NOW</button>
                            </div>
                                      
                        </article>

                        <article>
                            <img src="https://picsum.photos/600/400?image=1056" alt="Sample photo" className="sample-photo"/>
                            <div className="course-text">
                            <p className="text-center">Michigan Programming for Everybody
                                <br/>University of Michigan</p>                             
                                <button onClick={()=>this.viewEnroll("Michigan Programming for Everybody")} type="button" className="btn btn-outline btn-block" id="btn-enroll3">ENROLL NOW</button>                                  
                            </div>
                            
                        </article>

                        <article>
                            <img src="https://picsum.photos/600/400?image=1050" alt="Sample photo" className="sample-photo"/>
                            <div className="course-text">
                            <p className="text-center">Web Development<br/>
                                University of Michigan </p>  
                                <button onClick={()=>this.viewEnroll("Web Development")} type="button" className="btn btn-outline btn-block" id="btn-enroll4">ENROLL NOW</button>             
                            </div>

                        </article>

                        <article>
                            <img src="https://picsum.photos/600/400?image=1041" alt="Sample photo" className="sample-photo"/>
                            <div className="course-text">
                            <p className="text-center">Fundamentals of Finance
                                <br/>University of Michigan</p> 
                                <button onClick={()=>this.viewEnroll("Fundamentals of Finance")} type="button" className="btn btn-outline btn-block" id="btn-enroll5">ENROLL NOW</button>                  
                            </div>
                        </article>

                        <article>
                            <img src="https://picsum.photos/600/400?image=1015" alt="Sample photo" className="sample-photo"/>
                            <div className="course-text">
                            <p className="text-center">The Science of Well Being
                                <br/>University of Michigan</p>  
                                <button onClick={()=>this.viewEnroll("The Science of Well Being")} type="button" className="btn btn-outline btn-block" id="btn-enroll6">ENROLL NOW</button>
                                
      
                
                            </div>
                        </article>
                        
            </main>
            </div>          
            

{/* <!-- Modal --> */}
                    {/* <div className="container">
                        <div className="row">
                            <div className="col=md-12">
                                <div id="myModal" className="modal fade">
                                    <div className="modal-dialog">

                                    
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1>This is Modal</h1>
                                            </div>
                                            <div className="modal-body"> */
                                                // <div className= "container-fluid"> 
                                                //     <div className= "row">
                                                //         <div className ="col-12 col-sm-6">
                                                //             <h1>About this course</h1>
                                                //             <h4>171,971 recent views</h4>
                                                //             <p>Japanese language has become extremely popular among learners in recent years, since it is the best way to explore one of the richest and most mysterious cultures of the modern East. This course is  aimed at those who are interested in understanding Japanese way of thinking and view of the world through learning the language. Course materials are provided by the teaching staff from the Department of Japan Studies.

                                                //                 <br/>Upon completion of this course the learners will be able: 
                                                //                 <br/>1. To read simple texts in Japanese and write using the hiragana and katakana scripts as well as the kanji characters.
                                                //                 <br/>2. To understand basic vocabulary in speech and use it in everyday communicative situations.
                                                //                 <br/>3. To form their own sentences using the provided grammar material.
                                                //                 The course provides extensive materials on Japanese grammar, phonetics, writing system and communication etiquette, as well as exercises for learners to apply the new knowledge. The vocabulary of the course consists of more than 200 words. 
                                                //                 Those who are interested in continuing their learning of Japanese language can proceed to the second part of this course - Japanese for beginners 2.</p>
                                                //         </div>
                                                //         <div className ="col-12 col-sm-6" id="list-skills">
                                                //             <h3>SKILLS YOU WILL GAIN</h3>
                                                //             <ul>
                                                //                 <li>Basic grammar of Japanese</li>
                                                //                 <li>Japanese for everyday communication</li>
                                                //                 <li>Basic rules of Japanese communication etiquette</li>
                                                //                 <li>Skill of writing Japanese letters and characters</li>
                                                //                 <li>Basics of the Japanese pronunciation</li>
                                                //             </ul>
                                                //         </div>
                                                //         <div className ="col-12 col-sm-6" id="btn-enroll-modal">
                                                //         <button type="button" className="btn btn-primary" id="btn-enroll7">ENROLL NOW</button>
                                                //         </div>                                                                                                                                                                             
                                                //     </div>
                                                // </div>
                                            /*</div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
                    </div> */}
                    
               
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            </div>
        )
    }
}



export default listCourse