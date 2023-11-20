import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css';
import { toMongo, fromMongo, forVisualization } from '../../actions/weather';
import DownloadJson from '../../components/buttons/DownloadJson';
import DownloadXlsx from '../../components/buttons/DownloadXlsx';
import DownloadCsv from '../../components/buttons/DownloadCsv';
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
  const [isDownloadingJson, setIsDownloadingJson] = useState(false);
  const [isDownloadingTxt, setIsDownloadingTxt] = useState(false);
  const [isDownloadingCsv, setIsDownloadingCsv] = useState(false);
  const [isDownloadingXlsx, setIsDownloadingXlsx] = useState(false);

  const handleFetchDataClick = () => {
    setShowButtons(false);
    const [startDate, endDate] = dateRange;
    dispatch(fromMongo({ userId: currentUser?.result._id, startDate: new Date(startDate).toISOString(), endDate: new Date(endDate).toISOString() }));
    dispatch(forVisualization({ userId: currentUser?.result._id }))
    setShowButtons(true);
  };

  const handleVisualizeClick = () => {
    navigate("/Visualize");
  };

  const handleJsonDownload = () => {
    setIsDownloadingJson(true);
  }
  const handleTxtDownload = () => {
    setIsDownloadingTxt(true);
  }
  const handleCsvDownload = () => {
    setIsDownloadingCsv(true);
  }
  const handleXlsxDownload = () => {
    setIsDownloadingXlsx(true);
  }

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
          <div id="map-container"></div>
          <div id="controls">
            <div id="datepick">
              <DatePicker
                selectsRange={true}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
                placeholderText="Select Date Range"
              />
            </div>
            <div id="buttons">
              {showButtons && weatherdata && (
                <div>
                  <button
                    className="button button-shadow-pop"
                    onClick={handleJsonDownload}
                    disabled={isDownloadingJson}
                  >
                    {isDownloadingJson ? (
                      <FontAwesomeIcon icon={faSpinner} spin size="lg" />
                    ) : (
                      "Download .JSON File"
                    )}
                  </button>
                  <button
                    className="button button-shadow-pop"
                    onClick={handleTxtDownload}
                    disabled={isDownloadingTxt}
                  >
                    {isDownloadingTxt ? (
                      <FontAwesomeIcon icon={faSpinner} spin size="lg" />
                    ) : (
                      "Download .TXT File"
                    )}
                  </button>
                  <button
                    className="button button-shadow-pop"
                    onClick={handleCsvDownload}
                    disabled={isDownloadingCsv}
                  >
                    {isDownloadingCsv ? (
                      <FontAwesomeIcon icon={faSpinner} spin size="lg" />
                    ) : (
                      "Download .CSV File"
                    )}
                  </button>
                  <button
                    className="button button-shadow-pop"
                    onClick={handleXlsxDownload}
                    disabled={isDownloadingXlsx}
                  >
                    {isDownloadingXlsx ? (
                      <FontAwesomeIcon icon={faSpinner} spin size="lg" />
                    ) : (
                      "Download .XLSX File"
                    )}
                  </button>
                </div>
              )}
              <div className="action-buttons">
              <button
                onClick={handleFetchDataClick}
                className="button button-shadow-pop"
              >
                Fetch Data
              </button>
              <button
                onClick={handleVisualizeClick}
                className="button button-shadow-pop"
              >
                Visualize Data
              </button>
              </div>
            </div>
            {isDownloadingJson && (
              <DownloadJson
                setIsDownloading={setIsDownloadingJson}
                weatherdata={weatherdata}
              />
            )}
            {isDownloadingTxt && (
              <DownloadTxt
                setIsDownloading={setIsDownloadingTxt}
                weatherdata={weatherdata}
              />
            )}
            {isDownloadingCsv && (
              <DownloadCsv
                setIsDownloading={setIsDownloadingCsv}
                weatherdata={weatherdata}
              />
            )}
            {isDownloadingXlsx && (
              <DownloadXlsx
                setIsDownloading={setIsDownloadingXlsx}
                weatherdata={weatherdata}
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>
            Sorry, come back tomorrow. You have exhausted your daily quota of 5
            interactions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;
