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

    if (user.interactions <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify("No interactions left"),
      };
    }

    user.interactions--;
    await user.save();

    return {
      statusCode: 200,
      body: JSON.stringify('The number of interactions has been reduced by 1'),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify("Internal Server Error"),
    };
  }
});
