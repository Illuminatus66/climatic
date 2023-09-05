import * as api from '../api';
import { setWeather, resetWeather} from '../reducers/weatherSlice'

export const visitorData = (location) => async (dispatch) => {
  try {
    dispatch (resetWeather());
    const {lat, lng} = location;
    const {payload} = await api.visitorData(lat, lng);
    dispatch (setWeather(payload));
  } catch (error) {
    console.log(error);
  }
};

export const mapData = (location) => async () => {
  try {
    const {lat, lng} = location;
    await api.mapData(lat,lng);
  } catch (error) {
    console.log(error);
  }
};

export const toMongo = (weatherData) => async () => {
  try {
    const { _id, tomorrowData } = weatherData;
    await api.toMongo(
      _id,
      tomorrowData,
    );
  } catch (error) {
    console.log(error);
  }
};
