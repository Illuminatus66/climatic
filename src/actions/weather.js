import * as api from '../api';
import { setWeather, resetWeather} from '../reducers/weatherSlice'

export const visitorData = (location, dispatch) => async (dispatch) => {
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

