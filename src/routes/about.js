import React, { Component } from 'react'

class About extends Component {

    constructor(params) {

        super(params);
        this.state = {
            loading: false
        }
    }
    render() {
        return (
            <div>
                <h1>About</h1>
            </div>
        )
    }
}

export default About
