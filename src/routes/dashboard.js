import React, { Component } from 'react';
import { Button, Input, Spinner, } from 'reactstrap';
import SpinnerLoading from "../components/loaders";
import { urlBase64ToUint8Array } from '../helpers/converters';

const publicVapidKey = "BCj54G9kp6-MuxVje45_rEdNd24WnFaDLOquVDqrdeqGy_NwwaeTovYJoKdP429zTri6hqypw4TXKMFF6a57aMQ";

class Dashboard extends Component {

    constructor(params) {

        super(params);
        this.state = {
            loading: false,
            notificationMessage: "Push Notification you your Phone",
            subscriptionDone: false
        }
    }



    // configure the push subscription 

    configurePushSubscription = () => {

        this.setState({ loading: true });
        console.log("you are inside the web notification subscription code !!");
        if (!'Notification' in navigator) {
            return;
        }

        let swRef;

        navigator.serviceWorker.ready.then(sw => {
            swRef = sw;
            return swRef.pushManager.getSubscription(); // this allow to get the subscripition 

        }).then(sub => {
            if (sub === null) {
                // create a new subscription 
                console.log("we dont have the subcription")

                return swRef.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
                }).then(subscription => {
                    console.log("user is subscribed", subscription)
                });
            } else {
                // we have a subscription ;
                console.log("we have the subcription", sub);
                return sub;
            }
        }).then(function (newSub) {

            // here you have to store this newsbu i.e. your subscription user to database
            // with the help of newSub Request payload // you get the endpoing and keys {p256dh , auth}
            // which is used to send the notification to the user 
            console.log("this is subsciriton body", newSub);

            let urlDb = "https://pwa-serv-notify.herokuapp.com/api/pwa/subscribe";
            return fetch(urlDb, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newSub)
            })
        }).then(function (res) {
            if (res.ok) {
                console.log("new subscriber is added to DB ", res);
                this.setState({ loading: false });

                let subBtn = document.getElementById("sub-notification");
                subBtn.style.display = "none";
            }
        }).catch(function (err) {
            this.setState({ loading: false });

            console.log("server : App subscriber error ", err);
        });




    }


    pushNotification = () => {
        const { notificationMessage } = this.state;
        let option = {
            body: "",
            icon: "/images/icons/icon-96x96.png",
            vibrate: [100, 50, 200]
        }

        //  new Notification(notificationMessage, option);
        navigator.serviceWorker.ready.then(sw => {
            sw.showNotification(notificationMessage, option)
        });
    }



    helpNotification = () => {
        let notificationMessage = "visite the Help page of site";
        let option = {
            body: "you can visit the help page /in application/site",
            vibrate: [100, 50, 200],
            actions: [
                { action: "open", title: "okay" },
                { action: "cancel", title: "nope" }
            ]
        }

        navigator.serviceWorker.ready.then(sw => {
            sw.showNotification(notificationMessage, option)
        })

    }







    render() {
        return (
            <div>
                <h1>Notification</h1>

                {this.state.loading && <SpinnerLoading />}

                <div className="card">
                    <div className="container">
                        <h3>Push Notification</h3>

                        <Input type="text" value={this.state.notificationMessage}
                            onChange={e => this.setState({ notificationMessage: e.target.value })}

                        />

                        <br />
                        <br />

                        <Button
                            color="primary" size="sm"
                            onClick={() => this.pushNotification()}>Push Notification</Button>

                        <br />
                        <br />

                        <Button
                            color="primary" size="sm" onClick={() => this.helpNotification()}>Help page notification </Button>


                        <br />
                        <br />

                        <Button
                            id="sub-notification"
                            color="primary" size="sm"
                            onClick={() => this.configurePushSubscription()}>
                            Confirm Push Subscription{" "}
                            {
                                this.state.loading && <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            }
                        </Button>




                        <br />
                        <br />

                        <h6>you will get notification if subscription done!</h6>


                    </div> </div>
            </div>
        )
    }
}

export default Dashboard
