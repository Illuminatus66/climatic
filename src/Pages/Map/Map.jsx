import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css';
import { mapData } from '../../actions/weather'
import DownloadJson from '../../components/buttons/DownloadJson';
import DownloadExcel from '../../components/buttons/DownloadExcel';
import ExportToCSV from '../../components/buttons/ExportToCSV';

const Map = () => {
  const User= useSelector((state)=> state.fetchCurrentUser)
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (User) {
        dispatch(
          mapData({ lat, lng })
        );
      };
    };

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaWxsdW1pbmF0dXM2NiIsImEiOiJjbGxnYnRpeXcxNDhjM21tZ25jcndxeDVzIn0.-vZDD9v0rvv-8GPCTpRvgg';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [72.87454485949254, 19.206438327005614],
      zoom: 13,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    map.addControl(geocoder);
  }, []);

  return (
    <div>
    <div id='map'></div>
    <button><DownloadJson/></button>
    <button><DownloadExcel/></button>
    <button><ExportToCSV/></button>
    </div>
  );
};

export default Map;
