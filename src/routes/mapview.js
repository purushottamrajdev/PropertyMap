import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';


// mapboxgl.accessToken = '<your access token here>';
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/dark-v10',
// center: [-103.59179687498357, 40.66995747013945],
// zoom: 3
// });

const coordinate = [18.521609, 73.854105]
const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g'
});

class MapBoxApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDrawOn: false
        }
    }

    onDrawCreate = ({ features }) => {
        console.log(features);
    };

    onDrawUpdate = ({ features }) => {
        console.log({ features });
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to react-mapbox-gl-draw</h2>
                    <button onClick={() => this.setState({ isDrawOn: !this.state.isDrawOn })}>Draw Area</button>
                </div>
                <Map
                    style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
                    containerStyle={{
                        height: '100vh',
                        width: '100vw'
                    }}
                    center={coordinate}
                    zoom={[1]}

                >
                    {this.state.isDrawOn ? <DrawControl
                        position="top-left"
                        onDrawCreate={this.onDrawCreate}
                        onDrawUpdate={this.onDrawUpdate}
                    /> : null}
                </Map>
            </div>
        );
    }
}

export default MapBoxApp;