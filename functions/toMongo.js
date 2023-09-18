import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Weather from "../models/Weather.js";
import dotenv from 'dotenv';

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
    console.log(error);
    return {
      statusCode: 401,
      body: JSON.stringify("Unauthorized"),
    };
  }
};

exports.handler = auth(async (event, context) => {
  try {
    const {userId, lat, lng, place, weather} = JSON.parse(event.body);

    const postWeather = new Weather({
      userId,
      location: {
        lat: lat,
        lng: lng,
        place: place,
      },
      weather: weather
    });

    await postWeather.save();

    return {
      statusCode: 200,
      body: JSON.stringify("Posted weather data successfully"),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 409,
      body: JSON.stringify("Couldn't post a new data entry"),
    };
  }
});
