import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Weather from "../models/Weather.js";
import Climatic from "../models/auth.js";
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const auth = (handler) => async (event, context) => {
  try {
    const authorizationHeader = event.headers && event.headers.authorization;
    if (!authorizationHeader) {
      return {
        statusCode: 401,
        body: JSON.stringify("Unauthorized: Missing authorization header"),
      };
    }

    const token = authorizationHeader.split(" ")[1];
    let decodeData = jwt.verify(token, process.env.JWT_SECRET);
    event.userId = decodeData?.id;
    return await handler(event, context);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 401,
      body: JSON.stringify("Unauthorized"),
    };
  }
};

exports.handler = auth(async (event, context) => {
  try {
    const { userId, lat, lng, place } = JSON.parse(event.body);

    const apiKey = process.env.TOMORROW_IO_API_KEY;
    const apiUrl = `https://api.tomorrow.io/v4/timelines?apikey=${apiKey}`;

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        location: [lat, lng],
        fields: [
          'temperature',
          'temperatureApparent',
          'dewPoint',
          'humidity',
          'windSpeed',
          'pressureSeaLevel',
          'sunriseTime',
          'sunsetTime',
          'visibility',
          'cloudCover',
          'uvIndex',
          'precipitationIntensity',
          'precipitationProbability',
          'weatherCodeDay',
          'weatherCodeNight',
        ],
        units: 'metric',
        timesteps: ['1d'],
        startTime: 'now',
        endTime: 'nowPlus2d',
        timezone: 'Asia/Kolkata',
      }),
    };

    const response = await fetch(apiUrl, options);

    if (!response || response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    const weather = data.data.timelines[0].intervals;

    const postWeather = new Weather({
      userId,
      location: {
        lat: lat,
        lng: lng,
        place: place,
      },
      weather: weather,
    });

    await postWeather.save();

    const user = await Climatic.findById(userId);
    if (user && user.interactions > 0) {
      user.interactions--;
      await user.save();
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user.interactions),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 409,
      body: JSON.stringify("Couldn't post weather data or couldn't reduce the number of interactions"),
    };
  }
});
