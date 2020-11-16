import React, {Component} from 'react'
import './author.css'
import AvatarNhan from '../../assets/images/course.jpg'
const Author = () => {
        return (
            <div>
                <div className="content"><h1>HERE IS OUR TEAM</h1></div>
                <div className="author">
                    <div className="teammate">
                        <img src={AvatarNhan}></img>
                        <h2>Nguyen Trung Nhan</h2>
                        <h4>LEADER</h4>
                        <p className="description">You can write here details about one of your team members. You can give more details about what they do. Feel free to add some links for people to be able to follow them outside the site.</p>
                    </div>
                    <div className="teammate">
                        <img src={AvatarNhan}></img>
                        <h2>Nguyen Trung Nhan</h2>
                        <h4>LEADER</h4>
                        <p className="description">You can write here details about one of your team members. You can give more details about what they do. Feel free to add some links for people to be able to follow them outside the site.</p>
                    </div>
                    <div className="teammate">
                        <img src={AvatarNhan}></img>
                        <h2>Nguyen Trung Nhan</h2>
                        <h4>LEADER</h4>
                        <p className="description">You can write here details about one of your team members. You can give more details about what they do. Feel free to add some links for people to be able to follow them outside the site.</p>
                    </div>
                    <div className="teammate">
                        <img src={AvatarNhan}></img>
                        <h2>Nguyen Trung Nhan</h2>
                        <h4>LEADER</h4>
                        <p className="description">You can write here details about one of your team members. You can give more details about what they do. Feel free to add some links for people to be able to follow them outside the site.</p>
                    </div>
                </div>              

            </div>
        )
    
}

export default Author