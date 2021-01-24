import React, {Component} from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './register.css'
class Registration extends Component {
   constructor(props){
       super(props);
      this.handleSubmit  = this.handleSubmit.bind(this);
   }
  
  handleSubmit  = async(event) =>  {
    const MySwal = withReactContent(Swal)
    const { value: formValues } = await MySwal.fire({
      title: 'Multiple inputs',
      html:
        '<input id="swal-input1" class="swal2-input">' +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })
    
    if (formValues) {
      const NewSwal = withReactContent(Swal)
      NewSwal.fire(JSON.stringify(formValues))
      let response = await axios.post('http://127.0.0.1:3000/members', {
          "username": "tram",
          "password": "huhu",
          "email": "2222221@gmail.com"
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
        
          
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
