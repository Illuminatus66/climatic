import * as api from '../api';
import { setWeather, resetWeather } from '../reducers/weatherSlice';
import { setMongoData, resetMongoData } from '../reducers/mongoSlice';
import { setInteractions } from '../reducers/interactionsSlice';

export const visitorData = ({lat, lng}) => async (dispatch) => {
  try {
    dispatch (resetWeather());
    const {data} = await api.visitorData(lat, lng);
    dispatch (setWeather(data));
  } catch (error) {
    console.log(error);
  }
};

export const toMongo = ({ userId, lat, lng, place }) => async () => {
  try {
    await api.toMongo(userId, lat, lng, place);
  } catch (error) {
    console.log(error);
  }
};

export const fromMongo = ({ userId, timestamp }) => async (dispatch) => {
  try {
    dispatch (resetMongoData())
    const {data} = await api.fromMongo(userId, timestamp);
    dispatch (setMongoData(data));
  } catch (error) {
    console.log(error);
  }
};

export const interactionsLeft = (_id) => async (dispatch) => {
  try {
    const {data} = await api.interactionsLeft(_id);
    dispatch (setInteractions(data));
  } catch (error) {
    console.log(error);
  }
};

export const decrementInteractions = (_id) => async (dispatch) => {
  try {
    const {data} = await api.decrementInteractions(_id);
    dispatch (setInteractions(data));
  } catch (error) {
    console.log(error);
  }
};