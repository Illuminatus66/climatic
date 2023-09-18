import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Climatic from "../models/auth.js";
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
  const { _id } = JSON.parse(event.body);

  try {
    const user = await Climatic.findById(_id);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify("User not found"),
      };
    }

    if (user.interactions > 0) {
      user.interactions--;
      await user.save();
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user.interactions),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify("Internal Server Error"),
    };
  }
});
