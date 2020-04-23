/**
 * @ Author: Abhijeet Khire
 * @ Create Time: 2020-04-10 01:21:59
 * @ Modified by: Abhijeet Khire
 * @ Modified time: 2020-04-15 22:25:27
 * @ Description:
 */

import React, { Component } from "react";
import { google, Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import SpinnerLoading from "../components/loaders";


export class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.state = {
            showingInfoWindow: false,
            showMarker: false,
            activeMarker: {},
            selectedPlace: {}
        };
    }

    handleMarkerView = () => {
        this.setState({ showMarker: !this.state.showMarker })
    }



    onMapClick = (e) => {

        console.log("Map Click ...", e);
    }

    onMapZoomHandler = (e) => {

        console.log("Map is zoomed...", e);
    }
    onMarkerClick(props, marker, e) {

        console.log("on Marker click", e);

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }


    diplayMapMarks = () => {
        let data = [
            {
                name: "pune",
                position: {
                    lat: 18.521609,
                    lng: 73.854105
                }
            },
            {
                name: "Pune shanivar",
                position: {
                    lat: 18.519259,
                    lng: 73.855363
                }
            },
            {
                position: {
                    lat: 18.521751,
                    lng: 73.858416
                },
                name: "Kasaba peth"
            },
            {
                position: {
                    lat: 18.517458,
                    lng: 73.858138
                },
                name: "Budhvar peth"
            },
            {
                position: {
                    lat: 18.524172,
                    lng: 73.859704
                },
                name: "Mangalwar peth"
            }
        ];


        let markerList = data.map((e, i) => {
            return <Marker
                onClick={this.onMarkerClick}
                position={e.position}
                name={e.name}
            />
        })

        return markerList;
    }

    render() {
        if (!this.props.google) {
            return <div>Loading...</div>;
        }

        return (
            <div>

                <div>
                    <button
                        onClick={() => this.handleMarkerView()
                        }>Show/Hide</button>
                </div>

                <Map
                    style={{
                        width: "90%",
                        height: "100%",
                        marginLeft: "5%",
                        marginTop: "50px"
                    }}
                    google={this.props.google}
                    initialCenter={{
                        lat: 18.521609,
                        lng: 73.854105
                    }}
                    zoom={14}
                    onClick={e => this.onMapClick(e)}
                    onZoomChanged={(e) => this.onMapZoomHandler(e)}

                >



                    {this.diplayMapMarks()}


                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyCcXjlA3bLlSEkAeMg-jdB6zIm-4gE4lQs"),
    libraries: ['places'],
    LoadingContainer: SpinnerLoading
})(MapContainer);

