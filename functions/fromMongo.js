import dotenv from "dotenv";
import { MongoClient } from 'mongodb';
dotenv.config();

exports.handler = async function (event, context) {
  console.log("event.body:", event.body);
  const { userId, startTime, endTime } = JSON.parse(event.body);
  const uri = process.env.CONNECTION_URL;
  const databaseName = "test";
  const collectionName = "weathers";
  let client;

  try {
    client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const query = {
      userId: userId,
      createdAt: { $gte: startTime, $lte: endTime }
    };

    const projection = {
      _id: 0,
      createdAt: 1,
      location: 1,
      weather: 1
    };

    const data = await collection.find(query).project(projection).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Search failed" }),
    };
  } finally {
    client.close();
  }
};
