import React, {Component} from "react";
import axios from 'axios';
import './register.css'
class Registration extends Component {
   constructor(props){
       super(props);
       let user = {
        name: "",
        email: "",
        password: "",
      }
      this.handleSubmit  = this.handleSubmit.bind(this);
   }
  
  handleSubmit  = async(event) =>  {
    this.user = {
        name: document.getElementById("reg-name").value,
        email: document.getElementById("reg-email").value,
        password: document.getElementById("reg-password").value,
      }
      console.log(this.user);
      alert(this.user);
    try {
        let response = await axios.post('http://127.0.0.1:3000/members', {        
            "username": this.user.name,
            "password": this.user.password,
            "email": this.user.email
        }
        );
          global.isLogin = true;
          console.log(global.isLogin);
          
          
        }
        catch(error ) {
          console.log(error);
          if (error.response && error.response.status === 401) alert(error.response);
          else console.log("Successfully")
        };
        alert(this.user);
        event.preventDefault();
  }

  render() {
    return (
      <section>
        <form onSubmit={ () => this.handleSubmit() }>
          <label>
            <span>name</span>
            <input id="reg-name"  type="text"
                    ref="name"
                    defaultValue=""
                    placeholder="name"
                    required />
          </label>
          <label>
            <span>email</span>
            <input id="reg-email" type="email"
                    ref="email"
                    defaultValue="" 
                    placeholder="@email"
                    required />
          </label>
          <label>
            <span>password</span>
            <input id="reg-password" type="password"
                    ref="password"
                    defaultValue=""
                    required />
          </label>
          <button>submit</button>
        </form>
      </section>
    );
  }
}
export default Registration
