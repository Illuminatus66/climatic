import mongoose from "mongoose";

const WeatherIntervalSchema = mongoose.Schema({
  startTime: Date,
  values: {
    cloudCover: Number,
    dewPoint: Number,
    humidity: Number,
    precipitationIntensity: Number,
    precipitationProbability: Number,
    pressureSeaLevel: Number,
    sunriseTime: Date,
    sunsetTime: Date,
    temperature: Number,
    temperatureApparent: Number,
    uvIndex: Number,
    visibility: Number,
    weatherCodeDay: Number,
    weatherCodeNight: Number,
    windSpeed: Number,
  },
});

const WeatherSchema = mongoose.Schema({
  userId: { type: String },
  timestamp: { 
    type: Date, 
    default: Date.now,
  toJSON: {
    transform: function (doc, ret) {
      ret.timestamp = doc.timestamp.toISOString();
      return ret;
    },
  },
},
  location: {
    place: String,
    lat: Number,
    lng: Number,
  },
  weather: [WeatherIntervalSchema],
});

export default mongoose.model("Weather", WeatherSchema);
