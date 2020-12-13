import React, {Component} from 'react'
import './overview.css'

class Overview extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:"Name of Course",
            overview: {
                weekId: [1,2,3,4,5,6],
                video: {
                    name: ["Video name 1", "Video name 2", "Video name 3", "Video name 4", "Video name 5", "Video name 6"],
                    time: ["10", "20", "10", "20", "10", "20"]
                },
                exam: {
                    name: ["Solving Programing", "Do it if you can"],
                    totalQuestion: [10, 10]
                },
                book: {
                    name: ["JavaScript", "Python"],
                    time: ["10", "15"]
                },
                idWeekPreviewing: 1

            }
        };
        this.changeWeek = this.changeWeek.bind(this);
    }

    showOverview(){
        let x = document.getElementById("overview-sidebar-week");
        if (x.style.display === "none" || x.style.display === "") {
            x.style.display = "block";
            // x.scrollIntoView();
          } else {
            x.style.display = "none";
          }
    }
    componentDidMount(){
        this.setState({
            idWeekPreviewing: 1
        })
    }
    changeWeek(item){
        // alert(item)
        this.setState({
            idWeekPreviewing: item
        })

    }

    render(){
        console.log(this.state);
        return (      
            <div id="overview-page">
                <div id="overview-sidebar">
                    <div className="overview-sidebar-child" id="overview-sidebar-overview" onClick={this.showOverview}>
                        <div className="overview-sidebar-title"><p>Overview</p></div>
                        
                    </div>
                    <div id="overview-sidebar-week">
                        {
                            this.state.overview.weekId.map(item => (
                                <div className="overview-sidebar-week-child"
                                onClick={() => this.changeWeek(item)}
                                >
                                    <p>Week</p>
                                </div>
                            ))
                        }
                        </div>
                    <div className="overview-sidebar-child" id="overview-sidebar-grades">
                        <div className="overview-sidebar-title"><p>Grades</p></div>
                    </div>
                    <div className="overview-sidebar-child" id="overview-sidebar-notes">
                        <div className="overview-sidebar-title"><p>Notes</p></div>
                    </div>
                    <div className="overview-sidebar-child" id="overview-sidebar-discussions">
                        <div className="overview-sidebar-title"><p>Discussion Forum</p></div>
                    </div>
                    <div className="overview-sidebar-child" id="overview-sidebar-messages">
                        <div className="overview-sidebar-title"><p>Messages</p></div>
                    </div>
                    <div className="overview-sidebar-child" id="overview-sidebar-resources">
                        <div className="overview-sidebar-title"><p>Resources</p></div>
                    </div>
                    <div className="overview-sidebar-child" id="overview-sidebar-course-info">
                        <div className="overview-sidebar-title"><p>Course Info</p></div>
                    </div>
                </div>
                <div id="overview-container">
                        <Week
                        weekId = {this.state.idWeekPreviewing}
                        nameOfCourse = {this.state.name}
                        videoname={this.state.overview.video.name[this.state.idWeekPreviewing-1]}
                        ></Week>
                </div>
            </div>
        )
    }
}

const Week = (props) => (
    <div id="overview-container-week">
        <div id="overview-container-week-title">
            <h1>Week {props.weekId}</h1>
            <h4>{props.nameOfCourse}</h4>
        </div>
        <div id="deobietdattengi">
            <h2>Week {props.weekId}</h2>
            <p>Discuss and ask questions about Week {props.weekId}.</p>
        </div>
        <div id="overview-container-week-warmup">
            <h2>Warm Up</h2>
        </div>
        <div id="overview-container-week-learning-objective">
            <h2>Learning Objectives</h2>
            <li>Estimate the running time of an algorithm</li>
            <li>Practice implementing efficient solutions</li>
            <li>Practice solving programming challenges</li>
            <li>Implement programs that are several orders of magnitude faster than straightforward programs</li>
        </div>
        <div id="overview-container-week-videoname" class="overview-container-week-videoname">
            <h2>{props.videoname}</h2>
        </div>
    </div>
)



export default Overview