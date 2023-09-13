import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Climatic from "../models/auth.js";
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
    const userId = event.userId;
    const user = await Climatic.findOne({ userId });
    
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify("User not found"),
      };
    }

    const currentTime = new Date();
    const lastInteractionTime = new Date(user.lastInteraction);
    const timeDifference = currentTime - lastInteractionTime;
    const oneDayMilliseconds = 24 * 60 * 60 * 1000;

    if (timeDifference >= oneDayMilliseconds) {
      user.interactions = 5;
      user.lastInteraction = currentTime;
      await user.save();
    }

    const interactions = user.interactions;

    return {
      statusCode: 200,
      body: JSON.stringify(interactions),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 409,
      body: JSON.stringify("Couldn't get the number of interactions"),
    };
  }
});
