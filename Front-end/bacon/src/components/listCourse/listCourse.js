import React, {Component}  from 'react'
import Button from 'react-bootstrap/Button'

import './script.js'
import './listCourse.css'
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>
class listCourse extends Component{

    render() {
        return (
            <div>
                <>
                    <Button href="#">Link</Button> <Button type="submit">Button</Button>{' '}
                    <Button as="input" type="button" value="Input" />{' '}
                    <Button as="input" type="submit" value="Submit" />{' '}
                    <Button as="input" type="reset" value="Reset" />
                </>
            </div>
        )
    }
}

export default listCourse