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
            name: ["a", "b", "c"],
            isView: [ false, false, false],
            linkVideo: [
                "https://www.youtube.com/embed/UCXao7aTDQM",
                "https://www.youtube.com/embed/0I647GU3Jsc",
                "https://www.youtube.com/embed/V5GS5ANG96M"
            ],
            linkVideoPlaying: "https://www.youtube.com/embed/UCXao7aTDQM" 
            
        }
        this.changeLinkVideo = this.changeLinkVideo.bind(this);
        this.showLesson = this.showLesson.bind(this)
    }
    changeLinkVideo(id){
        let link = this.state.linkVideo[parseInt(id)];
        // console.log(link);
        this.setState(state => ({
            linkVideoPlaying: link
          }));
        console.log("ID: "  + id);
        console.log("Link: " + link)
        console.log(this.state);
    }

    showExamination() {
        console.log("Clicked")
        let x = document.getElementById("exam");
        if (x.style.display === "none" || x.style.display === "") {
            x.style.display = "block";
            x.scrollIntoView();
          } else {
            x.style.display = "none";
          }
    }

    showLesson (id){
        id = parseInt(id) + 2;
        console.log("Show Lesson " + id)
        
        let x = document.querySelector("#root > div > div > div:nth-child(4) > div.menu-course > div:nth-child("+id+") > div")
        if (x.style.display === "none" || x.style.display === "") {
            x.style.display = "block";
            // x.scrollIntoView();
          } else {
            x.style.display = "none";
          }
    }

    render() {
        return (
            <div>
                <div className="video-screen">
                <iframe src={this.state.linkVideoPlaying} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                        showExamination={this.showExamination}
                        >{item}</Lesson>
                    ))}
                </div>
            
               
                
            </div>
        )
    }
}

const Lesson = props => (
    <div className="lesson">
        <button onClick={props.showLesson}>
        <div className="content-lesson">
            <div className="isActiveBar"></div>
            <div className="name-lesson">
                <p>{props.id}{props.name}</p>
            </div>
        </div>
        </button>
        <div className="menu-lesson">
            <button><div className="video-lesson">Watch Video</div></button>
            <button><div className="test-lesson">Do The Test</div></button>
            <button><div className="book-lesson">Reading Book</div></button>
        
        
        
        </div>
    </div>
);


export default Course