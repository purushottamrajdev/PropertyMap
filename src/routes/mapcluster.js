import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import './map.css';


export default class MapClusters extends Component {
    render() {
        return (
            <div>

                <Map className="markercluster-map" center={[51.0, 19.0]} zoom={4} maxZoom={18}>
                    {/* <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    /> */}

                    <MarkerClusterGroup
                        onClusterClick={
                            cluster => console.warn('cluster-click', cluster, cluster.layer.getAllChildMarkers())
                        }
                    >
                        <Marker
                            position={[49.8397, 24.0297]}
                            onClick={
                                marker => console.warn('marker-click', marker, marker.target.getLatLng())
                            }
                        />
                        <Marker
                            position={[52.2297, 21.0122]}
                            onClick={
                                marker => console.warn('marker-click', marker, marker.target.getLatLng())
                            }
                        />

                        <Marker position={[51.5074, -0.0901]}>
                            <Popup
                                minWidth={200}
                                closeButton={false}
                                onClose={popup => console.warn('popup-close', popup)}
                            >
                                <div>
                                    <b>Hello world!</b>
                                    <p>I am a lonely popup.</p>
                                </div>
                            </Popup>
                        </Marker>
                    </MarkerClusterGroup>
                </Map>
            </div>
        )
    }
}
