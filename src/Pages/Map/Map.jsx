import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css';
import { toMongo, fromMongo } from '../../actions/weather';
import DownloadJson from '../../components/buttons/DownloadJson';
import DownloadExcel from '../../components/buttons/DownloadExcel';
import ExportToCSV from '../../components/buttons/ExportToCSV';

const Map = () => {
  const currentUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const interactions = useSelector((state) => state.interactions.data);
  const mongodata = useSelector((state) => state.mongo.data);
  const [duration, setDuration] = useState(1);
  const [unit, setUnit] = useState('days');
  const [showButtons, setShowButtons] = useState(false);
  const [showMap, setShowMap] = useState(interactions > 0);

  const calculateTimestamp = (duration, unit) => {
    const currentDate = new Date();
    if (unit === 'days') {
      currentDate.setDate(currentDate.getDate() - duration);
    } else if (unit === 'months') {
      currentDate.setMonth(currentDate.getMonth() - duration);
    } else if (unit === 'years') {
      currentDate.setFullYear(currentDate.getFullYear() - duration);
    }
    return currentDate.getTime();
  };

  const handleFetchDataClick = () => {
    setShowButtons(false);
    const timestamp = calculateTimestamp(duration, unit);
    dispatch(fromMongo({ userId: currentUser?.result._id, timestamp}));
    setShowButtons(true);
  };

  useEffect(() => {
    const handleGeocoderResult = (result) => {
      const [lng, lat] = result.result.center;
      const place = result.result.place_name;
        dispatch(toMongo({ userId: currentUser?.result._id, lat, lng, place }));
    };

    if (interactions <= 0) {
      setShowMap(false);
      return;
    }

    if (currentUser && showMap && interactions > 0) {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiaWxsdW1pbmF0dXM2NiIsImEiOiJjbGxnYnRpeXcxNDhjM21tZ25jcndxeDVzIn0.-vZDD9v0rvv-8GPCTpRvgg';
      const map = new mapboxgl.Map({
        container: 'map2',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [72.87454485949254, 19.206438327005614],
        zoom: 13,
      });

      map.on('mousemove', (e) => {
        document.getElementById('info').innerHTML =
          JSON.stringify(e.point) +
          '<br />' +
          JSON.stringify(e.lngLat.wrap());
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        limit: 1,
        autocomplete: false,
      });

      geocoder.on('result', handleGeocoderResult);
      map.addControl(geocoder);
    }
  }, [interactions, dispatch, currentUser, showMap]);

  return (
    <div>
      {currentUser && interactions > 0 ? (
        <div className="container">
          <div id='map2'></div>
          <div id='info-container'>
            <pre id='info'></pre>
          </div>
          <div id='download'>
            <div id='menu'>
              <input
                type='number'
                id='duration'
                placeholder='Duration'
                min='1'
                max='99'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <select
                id='unit'
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value='days'>days</option>
                <option value='months'>months</option>
                <option value='years'>years</option>
              </select>
            </div>
            <div id='buttons'>
              {showButtons && (
                <>
                  <button><DownloadJson jsonData={mongodata} /></button>
                  <button><ExportToCSV jsonData={mongodata} /></button>
                  <button><DownloadExcel jsonData={mongodata} /></button>
                </>
              )}
              <button onClick={handleFetchDataClick}>Fetch Data</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Sorry, come back tomorrow. You have exhausted your daily quota of 5 interactions.</p>
        </div>
      )}
    </div>
  );
};

export default Map;
