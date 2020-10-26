import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/pages/orphanages-map.css'

import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])    
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, [])

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

                    {orphanages.map(orphanage => {
                        return(
                            <Marker
                                icon={mapIcon}
                                position={[orphanage.latitude,orphanage.longitude]}
                                key={orphanage.id}
                                >
                                <Popup closeButton={false} maxWidth={240} minWidth={240} className="map-popup">
                                    {orphanage.name}
                                    <Link to={`orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color="#FFF"/>
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    })}
                </Map>                
            </div>

            <Link to="orphanages/create" className="create-orphanage">
                <FiPlus />
            </Link>
        </div>
    )
}

export default OrphanagesMap