import * as api from '../api';
import { setWeather, resetWeather } from '../reducers/weatherSlice';
import { setMongoData, resetMongoData } from '../reducers/mongoSlice';
import { setInteractions } from '../reducers/interactionsSlice';

export const visitorData = (location) => async (dispatch) => {
  try {
    dispatch (resetWeather());
    const {lat, lng} = location;
    const {weatherData} = await api.visitorData(lat, lng);
    dispatch (setWeather(weatherData));
  } catch (error) {
    console.log(error);
  }
};

export const mapData = (location) => async (dispatch) => {
  try {
    dispatch (resetWeather());
    const {lat, lng} = location;
    const {weatherData} = await api.mapData(lat,lng);
    dispatch (setWeather(weatherData));
  } catch (error) {
    console.log(error);
  }
};

export const toMongo = (weatherData) => async () => {
  try {
    const { lat, lng, place, weather } = weatherData;
    await api.toMongo(
      lat,
      lng,
      place,
      weather,
    );
  } catch (error) {
    console.log(error);
  }
};

export const fromMongo = (weatherData) => async (dispatch) => {
  try {
    dispatch (resetMongoData())
    const {timestamp, location, weather } = weatherData;
    const {jsonData} = await api.fromMongo (
      timestamp,
      location,
      weather,
    );
    dispatch (setMongoData(jsonData));
  } catch (error) {
    console.log(error);
  }
};

export const interactionsLeft = () => async (dispatch) => {
  try {
    const { interactions } = await api.interactionsLeft ();
    dispatch (setInteractions(interactions));
  } catch (error) {
    console.log(error);
  }
};

export const decrementInteractions = () => async (dispatch) => {
  try {
    const { interactions } = await api.decrementInteractions ();
    dispatch (setInteractions(interactions));
  } catch (error) {
    console.log(error);
  }
};