import React, {Component } from 'react'

import './exam.css'

class Exam extends Component{
    render() {
        return(
            <div>
                
                <div class="wrapper">
                <h1 id="exam-title">EXAMINATION:</h1>
                    <form id="form" class="form">
                        <div class="form-control">
                            <label for="fn">First name</label>
                            <input type="text" id="fn"/>
                        </div>
                        <div class="form-control">
                            <label for="ln">Last name</label>
                            <input type="text" id="ln"/>
                        </div>
                        <div class="form-control">
                            <label for="mail">Email address</label>
                            <input type="email" id="mail"/>
                        </div>
                        <div class="form-control">
                            <label for="country">Country / Region</label>
                            <select class="select">
                                <option value="united states">United States</option>
                                <option value="vietnam">Vietnam</option>
                                <option value="europe">Europe</option>
                                <option value="asia">Asia</option>
                            </select>
                        </div>
                        <div class="form-control">
                            <label for="street">Street address</label>
                            <input type="text" id="street"/>
                        </div>
                        <div class="form-control">
                            <label for="ct">City</label>
                            <input type="text" id="ct"/>
                        </div>
                        <div class="form-control">
                            <label for="st">State / Province</label>
                            <input type="text" id="st"/>
                        </div>
                        <div class="form-control">
                            <label for="zp">ZIP / Postal</label>
                            <input type="text" id="zp"/>
                        </div>
                        <footer class="form__footer">
                            <button id="btn">Save</button>
                        </footer>
                    </form>
                   
                </div>
            </div>
        )
    }
}

export default Exam