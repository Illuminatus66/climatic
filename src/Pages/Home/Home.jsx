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
import logo from '../../assets/logo.png';
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
    if (currentUser?.result._id) {
      dispatch(interactionsLeft(currentUser.result._id));
    }
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
          <div className="col-sm-4">
            <div className="thumbnail">
              <img src={logo} alt="images of clouds and sun to show the purpose of the app" />
              <div className="caption">
                <h2>Information:</h2>
                <p>
                  This is the all new Climatic™ app. With us, you can choose to either get the weather as an <strong>unauthenticated 
                  user</strong>, which will enable you to double-click anywhere on the map provided by Mapbox. Then consequently, you'll
                  be able to <strong>view the weather data for 2 days inside an HTML table.</strong> Beware! You won't be able to download this
                  data because the table refreshes after every double-click.<br/><br/>
                  <p>
                  If you do decide to sign-in, 
                  you gain the perks to search for your desired location in the Geocoder support, also provided by Mapbox.<br/>
                  Apart from being able search and locate, you'll be able to <strong>fetch weather data for 3 days</strong>, ie. the current
                  day and two consecutive days. The data will be <strong>stored indefinitely</strong> and can be downloaded using our
                  simple and intuitive UI.
                  </p>
                  The weather data provided by Tomorrow.io contains various parameters such as:
                  <ol>
                    ‣Temperature and Apparent Temperature<br/>
                    ‣Humidity<br/>
                    ‣Rainfall Probablity and Intensity<br/>
                    ‣Cloud Cover<br/>
                    ‣UV Index<br/>
                    ‣Visibility<br/>
                    ‣Pressure at Sea Level<br/>
                    ‣Sunrise and Sunset Time<br/>
                    ‣Wind Speed<br/>
                    ‣Dew Point<br/>
                  </ol>
                  <p>
                  To fetch the stored data, you can specify the date range and fetch the data from MongoDB Atlas. 
                  You can then easily download the data in four different formats based upon your needs.
                  The most useful one, is obviously the <strong>.json</strong> file format which is the most beautiful way to display nested data.
                  If your needs fall in the data analytics or machine learning disciplines, a <strong>.csv</strong> file might be what
                  you need, and we have that too! A simple text or <strong>.txt</strong> file might be what you want but that gets more and more 
                  verbose as you keep on using the app. In that case, you might want to choose an <strong>.xlsx</strong> file because no amount of 
                  data can faze the trusty old Excel file format. 
                  </p><br/><br/>
                </p>
                <hr></hr>
                <p>Thank You! Send suggestions to <a href="mailto:varunsodhani2711@gmail.com">my email</a></p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <h1><u>Documentation</u></h1>
            <hr />
            <h2>About:</h2>
            <p>
              This Weather Data Downloader/Visualizer app was built on 30/08/2023 for the purpose of demonstrating the integration of various services<br/>
              like <strong>Mapbox's</strong> WebGL-based map rendering, their forward-geocoding capabilities, <strong>Tomorrow.io's</strong> extensive array of weather<br/>
              parameters and <strong>MongoDB's</strong> unopinionated document and schema structuring, complemented by blazingly-fast read-write speeds.<br/>
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
                weather data that you have previously searched for, using the date-picker on the top-right side. You'll soon see four<br/>
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
                <p className="legend">What the visitor sees after double-clicking on the map as an unauthenticated user in the /Visitor route</p>
              </div>
              <div>
                <img src={screenshot2} alt="The map view for authenticated users" />
                <p className="legend">The layout of the map for authenticated users in the /Map route with the date-picker on the right side.</p>
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
            <span style={{ fontFamily: 'Phudu', fontWeight: 'bolder', fontSize: '20px', paddingLeft: '5px' }}>
              A product by &copy; Illuminatus66
            </span>
            <span style={{ fontFamily: 'Phudu', fontWeight: 'bolder', fontSize: '20px', paddingLeft: '715px' }}>
              Full-Stack Web Development and AI/ML enthusiast
            </span>
          </div>
        </section>
      </body>
    </div>
  );
}

export default Home;
