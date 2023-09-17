import mongoose from "mongoose";

const WeatherSchema = mongoose.Schema({
  _id: { type: String },
  timestamp: { type: Date, default: Date.now },
  location: {
    place: String,
    lat: Number,
    lng: Number,
  },
  weather: { type: mongoose.Schema.Types.Mixed },
});

export default mongoose.model("Weather", WeatherSchema);
