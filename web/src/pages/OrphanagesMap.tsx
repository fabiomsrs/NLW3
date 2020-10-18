import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/pages/orphanages-map.css'


function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Piauí</strong>
                    <span>Teresina</span>
                </footer>
            </aside>
            
            <div>
                <Map
                    center={[-5.1421835,-42.8345309]}
                    zoom={12}
                    style={{width: '100vw', height: '100vh'}}
                >
                    {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                    <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                </Map>                
            </div>

            <Link to="#" className="create-orphanage">
                <FiPlus />
            </Link>
        </div>
    )
}

export default OrphanagesMap