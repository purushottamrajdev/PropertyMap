import React, { Component } from 'react'
import { Spinner } from 'reactstrap';

export default class Loader extends Component {
    render() {
        return (
            <div className="text-center mt-2">
                <Spinner color="primary" />
            </div>
        )
    }
}
