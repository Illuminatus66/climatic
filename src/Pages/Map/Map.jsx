import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css';
import { toMongo, fromMongo, forVisualization } from '../../actions/weather';
import DownloadJson from '../../components/buttons/DownloadJson';
import DownloadExcel from '../../components/buttons/DownloadExcel';
import DownloadCSV from '../../components/buttons/DownloadCSV';
import DownloadTxt from '../../components/buttons/DownloadTxt';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Map = () => {
  const currentUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const interactions = useSelector((state) => state.interactions.data);
  const weatherdata = useSelector((state) => state.weather.data);
  const [dateRange, setDateRange] = useState([null, null]);
  const [showButtons, setShowButtons] = useState(false);
  const [showMap, setShowMap] = useState(interactions > 0);

  const handleFetchDataClick = () => {
    setShowButtons(false);
    const [startDate, endDate] = dateRange;
    dispatch(fromMongo({ userId: currentUser?.result._id, startDate: new Date(startDate).toISOString(), endDate: new Date(endDate).toISOString() }));
    setShowButtons(true);
  };

  const handleVisualizeClick = () => {
    dispatch(forVisualization({ userId: currentUser?.result._id }))
    navigate("/Visualize");
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
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
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
              {showButtons && weatherdata && (
                <>
                  <button className='button button-shadow-pop'><DownloadJson/></button>
                  <button className='button button-shadow-pop'><DownloadTxt/></button>
                  <button className='button button-shadow-pop'><DownloadCSV/></button>
                  <button className='button button-shadow-pop'><DownloadExcel/></button>
                  <button onClick= {handleVisualizeClick} className='button button-shadow-pop'>Visualize Data</button>
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
