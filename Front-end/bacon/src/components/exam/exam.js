import React, {Component } from 'react'
import { Link } from 'react-router-dom';
// import classnames from 'classnames'; {/* cái này là để passing in class name */}
import './exam.css'

class Exam extends Component{
    constructor(props){
        super(props);
        this.state = {
            lesson: "Database Advanced",
            listQuestion : [{
            "id": 0,
            "question" : "How old are you?",
            "answers" :  [
                "1",
                "2",
                "3",
                "4"
            ],
            "correctAnswer" : "1"
          
         },
         {
            "id": 1,
            "question" : "What types of credit card do you have?",
            "answers" :  [
                "Visa",
                "Mastercard",
                "Deo co",
                "None of above"
            ],
            "correctAnswer" : "1"
          
         },
         {
            "id": 2,
            "question" : "How old are you?",
            "answers" :  [
                "1",
                "2",
                "3",
                "4"
            ],
            "correctAnswer" : "1"
         }] };
        
    }
    
    render() {
        return(
            <div className="exam">
                <Link to="/course"><button>Back</button></Link>
                <h1>{this.state.lesson}</h1>
                <hr/>
                {this.state.listQuestion.map(item => (
                        <Question 
                        key={item}     
                        question = {item.question} 
                        answers={item.answers} 
                        styleClassname = {item.id}
                        id = {parseInt(item.id) + 1}
                        >
                            {item}
                        </Question>
                    ))}
                <hr/>
                <Link to="/course">
                <button className="exam-button-submit">
                    SUBMIT
                </button>
                </Link>
               
            </div>
        )
    }
}

const Question = props => {
    return (
        <div className={`exam-question ${props.styleClassname}`}>
            <div className="exam-question-header">
                <div>
                    <p>{props.id}. {props.question}</p>
                </div>
                <div className="exam-question-point">1 point</div>
            </div>
            {
                props.answers.map(item => (
                    <div style={{display : 'flex'}}>
                    <input type="radio" value="" name={`exam-question ${props.styleClassname}`}/>
                    <p>{item}</p>
                  </div>
                              
                
                ))
            }
        </div>
    )
}



export default Exam