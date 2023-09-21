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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Map = () => {
  const currentUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const interactions = useSelector((state) => state.interactions.data);
  const mongodata = useSelector((state) => state.mongo.data);
  const [dateRange, setDateRange] = useState([null, null]);
  const [showButtons, setShowButtons] = useState(false);
  const [showMap, setShowMap] = useState(interactions > 0);

  const handleFetchDataClick = () => {
    setShowButtons(false);
    const [startDate, endDate] = dateRange;
    dispatch(fromMongo({ userId: currentUser?.result._id, startDate : startDate.toISOString(), endDate : endDate.toISOString() }));
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
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [72.87454485949254, 19.206438327005614],
        zoom: 13,
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
          <div id='map-container'></div>
          <div id='controls'>
            <div id='datepick'>
              <DatePicker
                selectsRange={true}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
                placeholderText='Select Date Range'
              />
            </div>
            <div id='buttons'>
              {showButtons && mongodata && (
                <>
                  <button><DownloadJson jsonData={mongodata} /></button>
                  <button><ExportToCSV jsonData={mongodata} /></button>
                  <button><DownloadExcel jsonData={mongodata} /></button>
                </>
              )}
              <button onClick={handleFetchDataClick} className='button button-shadow-pop'>Fetch Data</button>
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
