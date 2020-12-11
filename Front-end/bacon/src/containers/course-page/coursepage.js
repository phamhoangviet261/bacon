import React, {Component} from 'react'
import $ from 'jquery'
import Exam from '../../components/exam/exam.js'
import './coursepage.css'
import './script.js'
class Course extends Component {
    constructor(props){
        super(props);
        this.state = {
            idVideo: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
            name: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
            isView: [ false, false, false],
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
            linkVideoPlaying: "https://www.youtube.com/embed/UCXao7aTDQM" 
            
        }
        this.changeLinkVideo = this.changeLinkVideo.bind(this);
        this.showBook = this.showBook.bind(this)
    }
    changeLinkVideo(id){
        document.getElementById("screen-video").style.display = "block";
        document.getElementById("screen-book").style.display = "none";
        document.getElementById("screen-test").style.display = "none";
        let link = this.state.linkVideo[parseInt(id)];
        // console.log(link);
        this.setState(state => ({
            linkVideoPlaying: link
          }));
        console.log("ID: "  + id);
        console.log("Link: " + link)
        console.log(this.state);
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
        
        
        let x = document.querySelector("#root > div > div > div:nth-child(2) > div.menu-course > div:nth-child(" + id + ") > div.menu-lesson")
        if (x.style.display === "none" || x.style.display === "") {
            x.style.display = "block";
            // x.scrollIntoView();
          } else {
            x.style.display = "none";
          }
        let y = document.querySelector("#root > div > div > div:nth-child(2) > div.menu-course > div:nth-child(" + id + ") > div:nth-child(1) > div > div.activeBar")
        if(!y.classList.contains("isActiveBar")){
            y.className += " isActiveBar";
        } else {
            y.className = "activeBar";
        }
    }

    render() {
        return (
            <div>
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
            <div className="test-lesson" onClick={props.showBook}><p>Do The Test</p></div>
            <div className="book-lesson" onClick={props.showTest}><p>Reading Book</p></div>
        </div>
    </div>
);

const Book = props => (
    <div className="book">
        <h2>Data Structures and Algorithms with JavaScript</h2>
    </div>
);

const Test = props => (
    <div className="test">
        <h2>Test for Data Structures and Algorithms with JavaScript</h2>
    </div>
);


export default Course