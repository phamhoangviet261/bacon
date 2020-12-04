import React, {Component} from 'react'
import './payment.css'
class Payment extends Component {
    constructor(props){
        super(props)
        this.show_hide = this.show_hide.bind(this)
    }

    show_hide(att){
        if(att === 'visa')
        {
            let x = document.getElementById('visa');         
            x.style.display = "block";
            let y = document.getElementById('paypal')
            y.style.display = "none";           
        } else if(att === 'paypal'){
            let x = document.getElementById('paypal');         
            x.style.display = "block";
            let y = document.getElementById('visa')
            y.style.display = "none"; 
        }
    }

    render(){
        return (
            <div className="payment">
                <div className="payment-header">
                    <h2>Confirm</h2>
                    <div  className="span-enrolled">
                        <span>3,139,142 already enrolled!</span>
                    </div>                   
                </div>
                <div className="payment-form">
                    <div className="choose-payment">
                        <div className="choose-visa" onClick={()=>this.show_hide('visa')}><h3>VISA</h3></div>
                        <div className="choose-paypal" onClick={()=>this.show_hide('paypal')}><h3>PAYPAL</h3></div>
                    </div>
                    <div className="visa-and-paypal">
                    <div id="visa" className="visa">
                        <form>
                            <div>
                                <div className="field-payment">
                                    <label>Name on card VISA:</label>
                                    <input type="text" 
                                    placeholder="Enter the name on your card"
                                    name="name" 
                                    style={{width: "575px"}}/>
                                </div>
                                <div className="card-row">
                                    <div className="field-payment card-number">
                                        <label>Card number:</label>
                                        <input type="text" 
                                        placeholder="Enter your card number"
                                        name="card-number" 
                                        style={{width: "300px"}}/>    
                                    </div>
                                    <div className="field-payment exp-date">
                                        <label>Expiration date:</label>
                                        <input type="text" 
                                        placeholder="MM / YY"
                                        name="expiration-date" 
                                        style={{width: "100px"}}/>
                                    </div>
                                    <div className="field-payment cvv">
                                        <label>CVV:</label>
                                        <input type="text" 
                                        placeholder="CVV"
                                        name="cvv" 
                                        style={{width: "100px"}}/>
                                    </div>
                                </div>
                                <div className="field-payment country-select">
                                    <label>
                                    Your country
                                    </label>
                                    <input type="text" 
                                        placeholder="Enter your country"
                                        name="card-number" 
                                        style={{width: "575px"}}/>
                                    
                                </div>
                            </div>
                        <button className="btn-submit" type="submit" value="Submit">Pay now</button>
                        <p>I agree to the Terms of Use, Refund Policy, and Privacy Policy.</p>
                        </form>
                    </div>
                    <div id="paypal" className="paypal">
                    <form>
                            <div>
                                <div className="field-payment">
                                    <label>Name on card VISA:</label>
                                    <input type="text" 
                                    placeholder="Enter the name on your card"
                                    name="name" 
                                    style={{width: "575px"}}/>
                                </div>
                                <div className="card-row">
                                    <div className="field-payment card-number">
                                        <label>Card number:</label>
                                        <input type="text" 
                                        placeholder="Enter your card number"
                                        name="card-number" 
                                        style={{width: "300px"}}/>    
                                    </div>
                                    
                                    <div className="field-payment cvv">
                                        <label>CVV:</label>
                                        <input type="text" 
                                        placeholder="CVV"
                                        name="cvv" 
                                        style={{width: "100px"}}/>
                                    </div>
                                </div>
                                <div className="field-payment country-select">
                                    <label>
                                    Your country
                                    </label>
                                    <input type="text" 
                                        placeholder="Enter your country"
                                        name="card-number" 
                                        style={{width: "575px"}}/>
                                    
                                </div>
                            </div>
                            
                            <button className="btn-submit" type="submit" value="Submit">Pay now</button>
                            <p>I agree to the Terms of Use, Refund Policy, and Privacy Policy.</p>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

function Checkbox() {
    const [checked, setChecked] = React.useState(true);
  
    return (
      <label>
        <input type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        Check Me!
      </label>
    );
  }
  
  

export default Payment
