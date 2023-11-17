import dotenv from "dotenv";
import mongoose from "mongoose";
import Weather from "../models/Weather";
dotenv.config();

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const handler = async (event, context) => {
  const { userId } = event.queryStringParameters;

  try {
    const data = await Weather.find({
      userId: userId,
    }).select({
      _id: 0,
      createdAt: 1,
      location: 1,
      weather: 1,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Search failed" }),
    };
  }
};
