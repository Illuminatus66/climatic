import * as api from '../api';
import { setWeather, resetWeather } from '../reducers/weatherSlice';
import { setMongoData, resetMongoData } from '../reducers/mongoSlice';
import { setInteractions } from '../reducers/interactionsSlice';

export const visitorData = (location) => async (dispatch) => {
  try {
    dispatch (resetWeather());
    const {lat, lng} = location;
    const {data} = await api.visitorData(lat, lng);
    dispatch (setWeather(data));
  } catch (error) {
    console.log(error);
  }
};

export const mapData = (location) => async (dispatch) => {
  try {
    dispatch (resetWeather());
    const {lat, lng} = location;
    const {data} = await api.mapData(lat,lng);
    dispatch (setWeather(data));
  } catch (error) {
    console.log(error);
  }
};

export const toMongo = (data) => async () => {
  try {
    const { lat, lng, place, weather } = data;
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

export const fromMongo = (timestamp) => async (dispatch) => {
  try {
    dispatch (resetMongoData())
    const {data} = await api.fromMongo(timestamp);
    dispatch (setMongoData(data));
  } catch (error) {
    console.log(error);
  }
};

export const interactionsLeft = (_id) => async (dispatch) => {
  try {
    const { interactions } = await api.interactionsLeft(_id);
    dispatch (setInteractions(interactions));
  } catch (error) {
    console.log(error);
  }
};

export const decrementInteractions = (_id) => async (dispatch) => {
  try {
    const { interactions } = await api.decrementInteractions(_id);
    dispatch (setInteractions(interactions));
  } catch (error) {
    console.log(error);
  }
};