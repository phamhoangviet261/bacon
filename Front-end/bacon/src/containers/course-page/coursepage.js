import React, {Component} from 'react'
import $ from 'jquery'
import Exam from '../../components/exam/exam.js'
import './coursepage.css'
import './script.js'
class Course extends Component {
    constructor(props){
        super(props);
        this.state = {
            idVideo: ["0", "1", "2"],
            name: ["a", "b", "c"],
            isView: [ false, false, false],
            linkVideo: [
                "https://www.youtube.com/embed/UCXao7aTDQM",
                "https://www.youtube.com/embed/0I647GU3Jsc",
                "https://www.youtube.com/embed/UCXao7aTDQM"
            ],
            linkVideoPlaying: "https://www.youtube.com/embed/UCXao7aTDQM" 
            
        }
        this.changeLinkVideo = this.changeLinkVideo.bind(this);
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
                        time="1:23"
                        link=""
                        changeLink={() => this.changeLinkVideo(item)}
                        >{item}</Lesson>
                    ))}
                </div>
            
                <div className="button-border">
                    <button href="#exam" className="button" onClick={this.showExamination}>EXAM</button>
                </div>
                <div className="exam" id="exam">
                    <Exam name={this.props.name}>
                        {/* this.props.name: đưa cái name dc truyền từ conponent ngoài 
                        của CoursePage vào component Exam  */}
                        
                    </Exam>
                </div>
                
            </div>
        )
    }
}

const Lesson = props => (
    <button className="lesson" onClick={props.changeLink}>
        <p>{props.id}. {props.name}</p>
        <p>{props.time}</p>
    </button>
);


export default Course