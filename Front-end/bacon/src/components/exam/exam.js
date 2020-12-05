import React, {Component } from 'react'

import './exam.css'

class Exam extends Component{
    constructor(props){
        super(props);
        this.state = {
            listQuestion : [{
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
                {this.state.listQuestion.map(item => (
                        <Question 
                        key={item}     
                        question = {item.question} 
                        answers={item.answers}                
                        >
                            {item}
                        </Question>
                    ))}
               
            </div>
        )
    }
}

const Question = props => {
    return (
        <div className="exam-question">
            <p>{props.question}</p>
            {
                props.answers.map(item => (
                <label>
                     <Checkbox
                     checked={this.state.checked}
                     onChange={this.handleCheckboxChange}
                     />
                     <span>{item.answers}</span>
                </label>               
                
                ))
            }
        </div>
    )
}

const Checkbox = props => (
    <input type="checkbox" {...props} />
  )

export default Exam