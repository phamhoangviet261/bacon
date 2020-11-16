import React, {Component}  from 'react'
import './contact.css'
class Contact extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        message: ''
      }
    }
    
    handleSubmit(e) {
        console.log(this.state);
        e.preventDefault();

        fetch('http://localhost:3002/send', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            }).then(
            (response) => (response.json())
            ).then((response)=> {
            if (response.status === 'success') {
            alert("Message Sent."); 
            this.resetForm()
            } else if(response.status === 'fail') {
            alert("Message failed to send.")
            }
        })
    }

    resetForm(){
        this.setState({name: '', email: '', message: ''})
      }

    render() {
      return(
        <div>
            <div>
                <div className="background">
                    <div className="container">
                        <div className="screen">
                        <div className="screen-header">
                            <div className="screen-header-left">
                            <div className="screen-header-button close"></div>
                            <div className="screen-header-button maximize"></div>
                            <div className="screen-header-button minimize"></div>
                            </div>
                            <div className="screen-header-right">
                            <div className="screen-header-ellipsis"></div>
                            <div className="screen-header-ellipsis"></div>
                            <div className="screen-header-ellipsis"></div>
                            </div>
                        </div>
                        <div className="screen-body">
                            <div className="screen-body-item left">
                            <div className="app-title">
                                <span>CONTACT</span>
                                <span>US</span>
                            </div>
                            <div className="app-contact">CONTACT INFO : +84 94 64 29 609</div>
                            </div>
                            <div className="screen-body-item">
                            <div className="app-form">
                            <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                                <div className="app-form-group">
                                <input className="app-form-control" placeholder="NAME" value={this.state.name} onChange={this.onNameChange.bind(this)}/>
                                </div>
                                <div className="app-form-group">
                                <input className="app-form-control" placeholder="EMAIL" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                                </div>
                                <div className="app-form-group">
                                <input className="app-form-control" placeholder="CONTACT NO"/>
                                </div>
                                <div className="app-form-group message">
                                <input className="app-form-control" placeholder="MESSAGE"  value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                                </div>
                                <div className="app-form-group buttons">
                                <button className="app-form-button">CANCEL</button>
                                <button className="app-form-button">SEND</button>
                                </div>
                                </form>
                            </div>
                            
                            </div>
                            
                        </div>
                        </div>
                        {/* <div className="credits">
                        inspired by
                        <a className="credits-link" href="https://dribbble.com/shots/2666271-Contact" target="_blank">
                            <svg className="dribbble" viewBox="0 0 200 200">
                            <g stroke="#ffffff" fill="none">
                                <circle cx="100" cy="100" r="90" stroke-width="20"></circle>
                                <path d="M62.737004,13.7923523 C105.08055,51.0454853 135.018754,126.906957 141.768278,182.963345" stroke-width="20"></path>
                                <path d="M10.3787186,87.7261455 C41.7092324,90.9577894 125.850356,86.5317271 163.474536,38.7920951" stroke-width="20"></path>
                                <path d="M41.3611549,163.928627 C62.9207607,117.659048 137.020642,86.7137169 189.041451,107.858103" stroke-width="20"></path>
                            </g>
                            </svg>
                            Gururaj
                        </a>
                        </div> */}
                    </div>
                </div>

            </div>
        </div>
                    
      );
    }
  
    onNameChange(event) {
      this.setState({name: event.target.value})
    }
  
    onEmailChange(event) {
      this.setState({email: event.target.value})
    }
  
    onMessageChange(event) {
      this.setState({message: event.target.value})
    }
  
    
  }
  
  export default Contact;
