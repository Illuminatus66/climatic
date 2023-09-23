import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import screenshot1 from '../../assets/screenshot1.png';
import screenshot2 from '../../assets/screenshot2.png';
import screenshot3 from '../../assets/screenshot3.png';
import screenshot4 from '../../assets/screenshot4.png';
import screenshot5 from '../../assets/screenshot5.png';
import weather from '../../assets/weather.svg';
import { interactionsLeft } from '../../actions/weather';
import './Home.css';

function Home() {
  const currentUser = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    if (currentUser === null) {
      navigate('/Visitor');
    } else {
      navigate('/Map');
    }
  };

  useEffect(() => {
    dispatch(interactionsLeft(currentUser?.result._id));
  }, [dispatch, currentUser]);

  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
        />
      </head>
      <body>
        <section className="entire">
          <div className="col-sm-3">
            <div className="thumbnail">
              <img src={weather} alt="images of clouds and sun to show the purpose of the app" />
              <div className="caption">
                <h2>Information:</h2>
                <p>
                  This is the all new Climatic™ app. With us, you can choose to either get the weather as an unregistered 
                  user, which will enable you to double click anywhere on the map provided by Mapbox. Then consequently, you'll
                  be able to view the weather data for the next two days inside an HTML table.<br/><br/>
                  <p>
                  If you do decide to sign-in, 
                  you gain the perks to search for your desired location in the Geocoder support also provided by Mapbox.<br/>
                  Apart from being able search and locate, you'll be able to store the weather data for 3 days, ie. the current
                  day, the next day and the day after that. The data will be stored indefinitely and can be downloaded using our
                  simple but intuitive UI.
                  </p>
                  The weather data provided by Tomorrow.io contains various parameters such as:
                  <ol>
                    ‣Cloud Cover<br/>
                    ‣Humidity<br/>
                    ‣UV Index<br/>
                    ‣Temperature and Apparent Temperature<br/>
                    ‣Rainfall Probablity and Intensity<br/>
                    ‣Pressure at Sea Level<br/>
                    ‣Sunrise and Sunset Time<br/>
                    ‣Wind Speed<br/>
                    ‣Visibility<br/>
                    ‣Dew Point<br/>
                  </ol>
                  <p>
                  To fetch the stored data, you can specify the date range and Axios will fetch the data
                  from MongoDB Atlas. You can then easily download the data in four different formats based upon your needs.
                  The most useful one, is obviously the .json file format which is the most beautiful way to display nested data.
                  A simple text or .txt file might be what you want but that gets more and more verbose as you keep on using the 
                  app. In that case, you might want to choose a .xlsx file because no amount of data can faze the trusty old Excel
                  file format. If your needs fall in the data analytics or machine learning disciplines, a .csv file might be what
                  you need, and we have that too!
                  </p>
                </p>
                <hr></hr>
                <p>Thank You</p>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <h1><u>Documentation</u></h1>
            <hr />
            <h2>About:</h2>
            <p>
              This Weather Forecasting app was built on 30/08/2023 for the purpose of demonstrating the integration of various services<br/>
              like Mapbox's WebGL-based map rendering, their forward-geocoding capabilities, Tomorrow.io's extensive array of weather<br/>
              parameters and MongoDB's unopinionated document and schema structuring, complemented by blazingly-fast read-write speeds.<br/>
              You can get accurate weather of any place on Earth! Click on the button below and get your first weather forecast<br/>
              or you could read ahead to know how the web application was built and how it works-----&gt;
              <button className="buttonClass" onClick={handleButtonClick}>
                Get Forecast
              </button>
            </p>
            <h2>Guides: </h2>
            <p>
              <li>You can either choose to Sign-in as an authenticated user or simply click the Get Forecast button in the About section.</li>
              <li>
                After signing-in you can either search for the location you want to fetch the weather for, or you can download any<br/>
                weather data that you have previously searched for, using the date-picker on the top-left side. You'll soon see four<br/>
                options to download weather data in the format of your choosing. Currently, we have JSON, CSV, XLSX and TXT file formats.
              </li>
              <li>
                If you choose to remain unauthenticated your search and download capabilities will be disabled and you'll only be able<br/>
                to fetch data for two days, via double clicking on your desired location. The data will be displayed in an HTML table.
              </li>
              <li>
                You can only interact with the Geocoder 5 times per day as an authenticated user because the free-tier of Mapbox allows<br/>
                for very few forward-geocoding requests per month. Since Climatic™ doesn't offer a paid-tier, hence we cannot afford to<br/>
                breach the limits of the free-tier provided by either Mapbox or Tomorrow.io.
              </li>
            </p>
            <h2>Features: </h2>
            <p>
              <li>API calls to both Map and Weather interfaces are limited free-tier services but still enough to be viably used.</li>
              <li>Weather predictions for any location you want, of the current day as well as the next two days for unauthenticated users.</li>
              <li>Repeatedly double-clicking on different areas of the map will repopulate the HTML tables for unauthenticated users.</li>
              <li>Weather data can be retrieved for upto three days for users that sign-in. Search and download capabilities also enabled.</li>
              <li>Weather predictions include a wide variety of parameters that could enhance your understanding of the locality you want.</li>
              <li>Map and location services provided by Mapbox. Weather services by Tomorrow. Storage managed by MongoDB's Atlas.</li>
              <li>The website is one of a kind and fun to operate because of the simplistic UI built using React.</li>
            </p>
            <hr />
            <h3>Screenshots:</h3>
            <Carousel showArrows={true}>
              <div>
                <img src={screenshot1} alt="The map view for unauthenticated users" />
                <p className="legend">What the visitor sees after double-clicking on the map element as an unauthenticated user.</p>
              </div>
              <div>
                <img src={screenshot2} alt="The map view for authenticated users" />
                <p className="legend">The layout of the map element for authenticated users with the date-picker on the left side.</p>
              </div>
              <div>
                <img src={screenshot3} alt="The map view after fetching the data from MongoDB" />
                <p className="legend">Set the date range and click on fetch to see all of these file format options. Download one or all!</p>
              </div>
              <div>
                <img src= {screenshot4} alt= "The map view after 5 interactions per day are exhausted" />
                <p className="legend">When you interact 5 times with the geocoder on the map, you'll be locked out for exactly 24 hours.</p>
              </div>
              <div>
                <img src= {screenshot5} alt= "The downloaded data in .json format"/>
                <p className="legend">Data downloaded from one of the users' account in .json format.</p>
              </div>
            </Carousel>
            </div>
            <hr />
          <div className="footer">
            <span style={{ fontFamily: 'Phudu', fontWeight: 'bolder', fontSize: '20px' }}>
              A product of &copy; Illuminatus66
            </span>
            <span style={{ fontFamily: 'Phudu', fontWeight: 'bolder', fontSize: '20px', paddingLeft: '600px' }}>
              Full-Stack Web Development and AI/ML enthusiast
            </span>
          </div>
        </section>
      </body>
    </div>
  );
}

export default Home;
