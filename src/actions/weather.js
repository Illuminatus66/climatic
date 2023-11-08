import * as api from '../api';
import { setWeather, resetWeather } from '../reducers/weatherSlice';
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

export const toMongo = ({ userId, lat, lng, place }) => async (dispatch) => {
  try {
    const {data} = await api.toMongo(userId, lat, lng, place);
    dispatch (setInteractions(data));
  } catch (error) {
    console.log(error);
  }
};

export const fromMongo = ({ userId, startDate, endDate }) => async (dispatch) => {
  try {
    const {data} = await api.fromMongo(userId, startDate, endDate);
    dispatch (setWeather(data));
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

export const forVisualization = ({userId}) => async (dispatch) => {
  try {
    const {data} = await api.forVisualization(userId);
    dispatch (setWeather(data));
  } catch (error) {
    console.log(error);
  }
};