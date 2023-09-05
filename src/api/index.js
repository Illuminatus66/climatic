import axios from "axios";

const API = axios.create({
  baseURL: 'https://climatic-illuminatus66.netlify.app'
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }

  return req;
});

export const logIn = (authData) => API.post("/.netlify/functions/logIn", authData);
export const signUp = (authData) => API.post("/.netlify/functions/signUp", authData);
export const visitorData= (lat, lng) => API.post('/.netlify/functions/visitorData', lat, lng);
export const mapData= (lat, lng) => API.post('./netlify/functions/mapData', lat, lng);
export const toMongo = (weatherData) => API.post("./netlify/functions/toMongo", weatherData, {withCredentials: true});
export const retrieveWeather = (userId, timestamp) => API.get(`./netlify/functions/retrieveWeather/${userId}`, timestamp);