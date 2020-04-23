import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Spinner, } from 'reactstrap';
import axios from "axios";
import SpinnerLoading from "../components/loaders";
const _ = require('lodash');
const url = "https://pwa-serv-notify.herokuapp.com/api/pwa/subscribers";
// const url = "http://localhost:5000/api/pwa/subscribers";
class Admin extends Component {

    constructor(params) {

        super(params);
        this.state = {
            loading: false,
            title: "Admin notification!",
            body: "notification body",
            username: "the_admin",
            allUsers: []
        }
    }


    componentDidMount = () => {
        this.getAllSubscribers();
    }



    getAllSubscribers = () => {
        this.setState({ loading: true });
        axios({
            url
        }).then(res => {
            let data = _.reverse(res.data);
            this.setState({ allUsers: res.data, loading: false });
        }).catch(err => {
            this.setState({ loading: false });
        })
    }

    sendNotificationToAll = () => {
        this.setState({ loading: true });
        const { title, body } = this.state;
        let urlDb = "https://pwa-serv-notify.herokuapp.com/api/pwa/notifyAllUsers";
        fetch(urlDb, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title, body
            })
        }).then(res => {
            alert("notification sent to all");
            this.setState({ loading: false });
        }).catch(er => {
            console.log(er);
            this.setState({ loading: false });
        })

    }

    onChangeHandler = (name, value) => {
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>

                <h1 className="text-center">Admin</h1>
                <div className="card">
                    <div className="container">
                        <div>  UserName :   <Input type="text"
                            name="username"
                            placeholder="the_admin"
                            value={this.state.username}
                            onChange={e => this.onChangeHandler(e.target.name,
                                e.target.value
                            )}

                        />
                        </div>
                    </div>
                </div>




                {this.state.username === "the_admin" || true ?
                    <div className="card">
                        <div className="container">
                            <h3>Send Notification</h3>

                             Title :   <Input type="text"
                                name="title"
                                value={this.state.title}
                                onChange={e => this.onChangeHandler(e.target.name,
                                    e.target.value
                                )}

                            />

                            <br /> <br />

                           Body :   <Input
                                type="textarea"
                                name="body"
                                value={this.state.body}
                                onChange={e => this.onChangeHandler(e.target.name,
                                    e.target.value
                                )}

                            />


                            <br /><br />
                            <div>
                                {this.state.loading && <SpinnerLoading />}
                                <Button
                                    color="primary" size="sm"
                                    onClick={() => this.sendNotificationToAll()}>Send Notification</Button>
                            </div>
                        </div>
                    </div>
                    : <div>
                        <h5 className="text-center">Only For Admin Users</h5>


                    </div>
                }

                <div>

                    <div className="card">
                        <div className="container">

                            <h4>All Subscribers</h4> <Button
                                color="primary" size="sm"
                                onClick={() => this.getAllSubscribers()}> Refresh</Button>


                            {this.state.allUsers && this.state.allUsers.map((e, i) => {
                                return <div key={e._id}> <span>{i + 1}. </span> <span>{e._id}</span></div>
                            })}


                        </div></div>
                </div>
            </div>
        )
    }
}

export default Admin
