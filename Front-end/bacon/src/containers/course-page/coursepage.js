import React, {Component, setState  } from 'react'
import {Link, Redirect} from 'react-router-dom'
import $ from 'jquery'
import Exam from '../../components/exam/exam.js'
import './coursepage.css'
import './script.js'

import Header from '../../components/header/header.js'
class Course extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            idVideo: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
            name: ["Getting Started.", "Input and Output in Javascript.", "Hello World", "Condition Sentence and Loop", 
                    "Variable ans Scope", "This Operator", "Function", "ES6", "Final Project"],
            isView: [ false, false, false, false, false, false, false, false],
            linkVideo: [
                "https://www.youtube.com/embed/UCXao7aTDQM",
                "https://www.youtube.com/embed/0I647GU3Jsc",
                "https://www.youtube.com/embed/V5GS5ANG96M",
                "https://www.youtube.com/embed/UCXao7aTDQM",
                "https://www.youtube.com/embed/0I647GU3Jsc",
                "https://www.youtube.com/embed/V5GS5ANG96M",
                "https://www.youtube.com/embed/UCXao7aTDQM",
                "https://www.youtube.com/embed/0I647GU3Jsc",
                "https://www.youtube.com/embed/V5GS5ANG96M"
            ],
            linkVideoPlaying: "https://www.youtube.com/embed/UCXao7aTDQM" ,
            isLoggedIn: true,
            
        }

        const token = localStorage.getItem("token");
        
        if(token == null){
            this.setState = {
                isLoggedIn: false
            }
        }
        this.changeLinkVideo = this.changeLinkVideo.bind(this);
        this.showTest = this.showTest.bind(this);
        this.showBook = this.showBook.bind(this);

       
    }
    changeLinkVideo = (id) => {
        console.log(this.state);
        document.getElementById("screen-video").style.display = "block";
        document.getElementById("screen-book").style.display = "none";
        document.getElementById("screen-test").style.display = "none";
        let link = this.state.linkVideo[parseInt(id)];
        console.log(link);
        this.setState = ({
            linkVideoPlaying: link
          });
        console.log(this.state);
        console.log("ID: "  + id);
        console.log("Link: " + link)
        //this.setState({ state: this.state });
        //this.forceUpdate();
    }

    showTest(id) {
        document.getElementById("screen-video").style.display = "none";
        document.getElementById("screen-book").style.display = "none";
        document.getElementById("screen-test").style.display = "block";
    }

    showBook (id){
        document.getElementById("screen-video").style.display = "none";
        document.getElementById("screen-book").style.display = "block";
        document.getElementById("screen-test").style.display = "none";
    }

    showLesson(id){
        console.log("Show Lesson " + id )
        id = parseInt(id) + 2;
        
        
        let x = document.querySelector("#root > div > div > div > div > div.menu-course > div:nth-child("+ id +") > div.menu-lesson")
        //document.querySelector("#root > div > div > div > div > div.menu-course > div:nth-child("+ id +") > div.menu-lesson")
        if (x.style.display === "none" || x.style.display === "") {
            x.style.display = "block";
            // x.scrollIntoView();
          } else {
            x.style.display = "none";
          }
        let y = document.querySelector("#root > div > div > div > div > div.menu-course > div:nth-child("+id+") > div:nth-child(1) > div > div.activeBar")
        //document.querySelector("#root > div > div > div > div > div.menu-course > div:nth-child("+id+") > div:nth-child(1) > div > div.activeBar")
        if(!y.classList.contains("isActiveBarCourse")){
            y.className += " isActiveBarCourse";
        } else {
            y.className = "activeBar";
        }
    }

    render() {
        console.log("ccccccccccc");
        return (
            <div>
                <Header isLogin={true}></Header>
                <div className="learning-screen">
                    <div id = "screen-video">
                        <iframe src={this.state.linkVideoPlaying} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div id="screen-book" style={{display:'none'}}>
                        <Book></Book>
                    </div>
                    <div id="screen-test" style={{display:'none'}}>
                        <Test></Test>
                    </div>
                </div>

                <div className="menu-course">
                    <div className="content">
                        <p>Course content</p>
                    </div>
                    {/* <Lesson id = "1" 
                    name="HTML is a programming languages"
                    time="1:23"
                    link=""
                    changeLink={() => this.changeLinkVideo("1")}></Lesson> */}
                    {this.state.idVideo.map(item => (
                        <Lesson 
                        key={item}
                        id = {parseInt(item) + 1}
                        name={this.state.name[parseInt(item)]}
                        //name = this.state.name[id]
                        showLesson={() => this.showLesson(item)}
                        showVideo={() => this.changeLinkVideo(item)}
                        showBook={() => this.showBook(item)}
                        showTest={() => this.showTest(item)}
                        >
                            {item}
                        </Lesson>
                    ))}
                </div>
            
               
                
            </div>
        )
    }
}

const Lesson = props => (
    <div className="lesson">
        <div onClick={props.showLesson}>
        <div className="content-lesson">
            <div className="activeBar"></div>
            <div className="name-lesson">
                <p>{props.id} - {props.name}</p>
            </div>
        </div>
        </div>
        <div className="menu-lesson">
            <div className="video-lesson" onClick={props.showVideo}><p>Watch Video</p></div>
            <div className="test-lesson" onClick={props.showBook}><p>Reading Book</p></div>
            <div className="book-lesson" onClick={props.showTest}><p>Do The Test</p></div>
        </div>
    </div>
);

const Book = props => (
    <div className="book">
        <h2>Data Structures and Algorithms with JavaScript</h2>
        <Link to="/book"><button>Read it</button></Link>
    </div>
);

const Test = props => (
    <div className="test">
        <h2>Test for Data Structures and Algorithms with JavaScript</h2>
        <Link to="/exam"><button>Do it</button></Link>
    </div>
);


export default Course