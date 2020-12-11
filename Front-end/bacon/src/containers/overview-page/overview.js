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
                    name: ["Video 1", "Video 2"],
                    time: ["10", "20"]
                },
                exam: {
                    name: ["Solving Programing", "Do it if you can"],
                    totalQuestion: [10, 10]
                },
                book: {
                    name: ["JavaScript", "Python"],
                    time: ["10", "15"]
                }

            }
        };
    }


    render(){
        return (
            <div id="overview-page">
                <div id="overview-sidebar">
                    <div className="overview-sidebar-child" id="overview-sidebar-overview">
                        <div className="overview-sidebar-title"><p>Overview</p></div>
                        
                    </div>
                    <div id="overview-sidebar-week">
                        {
                            this.state.overview.weekId.map(item => (
                                <div className="overview-sidebar-week-child">
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
                <div id="overview-container"></div>
            </div>
        )
    }
}

const Week = (props) => (
    <div className="">

    </div>
)

export default Overview