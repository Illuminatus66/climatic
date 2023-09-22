import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import screenshot1 from '../../assets/screenshot1.png';
import screenshot2 from '../../assets/screenshot2.png';
import screenshot3 from '../../assets/screenshot3.png';
import weather from '../../assets/weather.svg';
import { interactionsLeft } from '../../actions/weather';
import './Home.css';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function Home() {
  const images = [screenshot1, screenshot2, screenshot3];
  const currentUser = useSelector((state) => state.user.data);
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    if (currentUser === null) {
      navigate('/Visitor');
    } else {
      navigate('/Map');
    }
  };

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    dispatch(interactionsLeft(currentUser?.result._id));
  }, [dispatch, currentUser]);

  return (
    <html>
      <head>
        <title>Weather Forecaster</title>
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
                  This is the all new Weather Forecast app. You can choose to either get the weather at your current
                  location or you can input any desired location by yourself using a clickable map interface. This
                  comes in very handy as it is a lightweight application designed for a web browser solely using HTML,
                  CSS and Javascript. We have also made frequent use of GET and POST APIs for both, the map interface
                  as well as the Weather forecast that is generated.
                </p>
                <hr></hr>
                <p>Thank You</p>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <h1>Documentation</h1>
            <hr />
            <h2>About:</h2>
            <p>
              This Weather Forecasting app was built on 29/04/2023 for the purpose<br />
              of demonstrating the use of API calls<br />
              You can get accurate weather of any place! Click on the button below and get your first weather<br />
              forecast or read ahead to know how the web application works-----&gt;
              <button className="buttonClass" onClick={handleButtonClick}>
                Get Forecast
              </button>
            </p>
            <hr />
            <h2>Guides: </h2>
            <p>
              <li>First Click on the Button(given above).</li>
              <li>
                Then choose whether you would like to see the weather forecast for the location you are currently in<br />
                (this will require geolocation permission) or if you want to see the weather at some other location.<br />
              </li>
              <li>The first button on the next page will simply display weather conditions at your current location.<br /></li>
              <li>The second button will lead you to an interactive, scrollable and scalable map where a double click will<br />
                register your chosen tilespace as a Latitude, Longitude pair that will help in requesting weather data.</li>
            </p>
            <hr />
            <h2>Features: </h2>
            <p>
              <li>API calls to both map and weather interfaces are limited free-tier services but still enough to be used at your discretion.</li>
              <li>You can get the weather predictions for any location you want, of the current day as well as the next day.</li>
              <li>Weather data can be retrieved</li>
              <li>Weather predictions carry a wide variety of parameters that could go up to 34 but we have included the 11 most important ones for simplicity's sake</li>
              <li>Interactive and labelled global map that can be panned and scrolled through to get weather data. A double click will register your chosen lat-lng pair</li>
              <li>Repeated double-clicks on different areas of the map will repopulate the tables where Weather Predicitions are stored. This means that you can view data for tons of different places without having to refresh the webpage</li>
              <li>The website is one of a kind and fun to operate because of the simplistic UI.</li>
            </p>
            <hr />
            <h2>Screenshots:</h2>
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={page}
                src={images[imageIndex]}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              />
            </AnimatePresence>
            <div className="next" onClick={() => paginate(1)}>
              {'‣'}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
              {'‣'}
            </div>
            <hr />
          </div>
          <div className="footer">
            <span style={{ fontFamily: 'Phudu', fontWeight: 'bolder', fontSize: '20px' }}>
              A product of &copy; Illuminatus66 and company
            </span>
            <span
              style={{ fontFamily: 'Phudu', fontWeight: 'bolder', fontSize: '20px', paddingLeft: '600px' }}
            >
              Full-Stack Web Development and AI/ML enthusiast
            </span>
          </div>
        </section>
      </body>
    </html>
  );
}

export default Home;
