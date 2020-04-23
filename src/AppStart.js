/**
 * @ Author: Daniel Lin
 * @ Create Time: 2020-04-10 01:21:59
 * @ Modified by: Abhijeet Khire
 * @ Modified time: 2020-04-17 18:24:56
 * @ Description:
 */


import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, hashHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

import { createBrowserHistory } from "history";

import Home from './routes/home';
import Dashboard from './routes/dashboard';
import About from './routes/about';
import Map from './routes/map.js';
import Admin from "./routes/admin";
import Timesheet from './routes/timesheet';


// map 

import BasicMap from "./routes/map_react/basicmap";




const history = createBrowserHistory();
const MainMenu = () => {
    return (
        <div>
            <Link to="/">
                <Button
                    className="mr-2"
                    color="primary" size="sm">home</Button>
            </Link>

            <Link to="/dashboard">
                <Button
                    className="mr-2"
                    color="primary" size="sm">Notifications </Button>
            </Link>

            <Link to="/admin">
                <Button
                    className="mr-2"
                    color="primary" size="sm">Admin</Button>

            </Link>

            {/* <Link to="/map">
                <Button
                    className="mr-2"
                    color="primary" size="sm">Map</Button>

            </Link>
            <Link to="/mapview">
                <Button
                    className="mr-2"
                    color="primary" size="sm">Map 2</Button>

            </Link><Link to="/mapcluster">
                <Button
                    className="mr-2"
                    color="primary" size="sm">Map Cluster</Button>

            </Link> */}

            <Link to="/map/basic">      <Button
                className="mr-2"
                color="primary" size="sm">Map Draw</Button></Link>




        </div>
    );
};

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome  to  <br />
                        Map - Lite</h1>
                        <MainMenu />
                    </header>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/map" component={Map} />
                            <Route exact path="/timesheets" component={Timesheet} />
                            <Route exact path="/admin" component={Admin} />
                            {/* <Route exact path="/mapview" component={Mapview} />
                            <Route exact path="/mapcluster" component={MapCluster} /> */}


                            <Route exact path="/map/basic" component={BasicMap} />






                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;