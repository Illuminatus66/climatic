import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Weather from "../models/Weather.js";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Invoke the database connection
connectDB();

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
    const postWeatherData = JSON.parse(event.body);
    const userId = event.userId;

    const postWeather = new Weather({
      ...postWeatherData,
      userId,
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
