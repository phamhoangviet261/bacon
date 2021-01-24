import React from 'react';
import './footer.css'
class Footer extends React.Component
{
  render()
  {
    return (
        <div className="footer">
            <div className="footer-tag">
                <div className="footer-tag-header"><p>PRODUCTS</p></div>
                <div className="footer-tag-content">
                    <p>Nguyen Trung Nhan</p>
                    <p>Pham Ho Ngoc Tram</p>
                    <p>Nguyen Gia Vi</p>
                    <p>Pham Hoang Viet</p>
                </div>
            </div>
            <div className="footer-tag">
                <div className="footer-tag-header"><p>EXPERIENCE</p></div>
                <div className="footer-tag-content">
                    <p>No experience</p>
                </div>
            </div>
            <div className="footer-tag">
                <div className="footer-tag-header"><p>BACON</p></div>
                <div className="footer-tag-content">
                    <p>Terms of service</p>
                    <p>Privacy Policy</p>
                    <p>Navigational Information</p>
                    <p>Changelog</p>
                </div>
            </div>
            <div className="footer-tag">
                <div className="footer-tag-header"><p>CONTACT</p></div>
                <div className="footer-tag-content">
                    <p>Email: support@bacon.com</p>
                    <p>Phone: 0373597130</p>
                    <div className="footer-tag-social">
                        {/* <Facebook /> */}
                        {/* <Twitter /> */}
                        
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

const Facebook = props => (
    <a href="#" id="facebookIcon"></a>
  );
  
  const Twitter = props => (
    <a href="#" id="twitterIcon"></a>
  );
  


export default Footer;