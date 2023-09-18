import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import climatic from '../models/auth';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async function (event, context) {
  const { name, email, password } = JSON.parse(event.body);
  
  try {
    const existingUser = await climatic.findOne({ email });
    if (existingUser) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User already exists." }),
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await climatic.create ({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return {
      statusCode: 201,
      body: JSON.stringify({ result: newUser, token }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong..." }),
    };
  }
};
