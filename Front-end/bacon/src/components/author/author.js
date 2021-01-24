import React, {Component} from 'react'
import './author.css'
import Avatar from '../../assets/images/course.jpg'
import AvatarNhan from '../../assets/images/nhan.jpg'
import AvatarVi from '../../assets/images/vi.jpg'
import AvatarTram from '../../assets/images/tram.png'
import AvatarViet from '../../assets/images/viet.jpg'
const Author = () => {
        return (
            <div>
                <div className="content"><h1>HERE IS OUR TEAM</h1></div>
                <div className="author">
                    <div className="teammate">
                        <img src={Avatar}></img>
                        <h2>Nguyen Trung Nhan</h2>
                        <h4>LEADER</h4>
                        <p className="description">Back-end developer and Technical Architecture. </p>
                    </div>
                    <div className="teammate">
                        <img src={Avatar}></img>
                        <h2>NGUYEN GIA VI</h2>
                        <h4>MEMBER</h4>
                        <p className="description">Tester and Designer.</p>
                    </div>
                    <div className="teammate">
                        <img src={Avatar}></img>
                        <h2>PHAM HO NGOC TRAM</h2>
                        <h4>MEMBER</h4>
                        <p className="description">Super Motivation, Main Front-end developer.</p>
                    </div>
                    <div className="teammate">
                        <img src={Avatar}></img>
                        <h2>PHAM HOANG VIET</h2>
                        <h4>MEMBER</h4>
                        <p className="description">Super Ultimate Extra Front-end developer.</p>
                    </div>
                </div>              

            </div>
        )
    
}

export default Author