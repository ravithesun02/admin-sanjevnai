import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Token="pk.eyJ1IjoicmF2aXRoZXN1bjAyIiwiYSI6ImNrYWV0NjZwNTIzcncyc210aTdmd3F4NGEifQ.vKkdifxbucOWaSKhgQj87g";

export default function AdminMap() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 23.746323,
    longitude: 84.509109,
    zoom: 10
  });

  const [selected,setSelected]=useState(null);

  return (
      <div>
    <ReactMapGL
    mapboxApiAccessToken={Token}
    mapStyle="mapbox://styles/ravithesun02/ckaetmgaz1qn41io4ijnzi04f"
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
    </ReactMapGL>
    </div>
  );
}