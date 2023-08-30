import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import climatic from '../models/auth';
import mongoose from 'mongoose';
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

exports.handler = async function (event, context) {
  const { email, password } = JSON.parse(event.body);
  try {
    const existingUser = await climatic.findOne({ email });
    if (!existingUser) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User doesn't exist." }),
      };
    }
    
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    
    if (!isPasswordCorrect) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid credentials" }),
      };
    }
    
    // Check if 24 hrs have passed since the last interaction
    const lastInteractionTime = new Date(existingUser.lastInteraction).getTime();
    const currentTime = new Date().getTime();
    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
    
    if (currentTime - lastInteractionTime >= twentyFourHoursInMs) {
      existingUser.interactions = 5;
      existingUser.lastInteraction = new Date();
      await existingUser.save();
    }
    
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify({ result: existingUser, token }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong..." }),
    };
  }
};
