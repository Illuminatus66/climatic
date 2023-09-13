import axios from "axios";

const API = axios.create({
  baseURL: 'https://climatic-illuminatus66.netlify.app/.netlify/functions'
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }

  return req;
});

export const logIn = (authData) => API.post("/login", authData);
export const signUp = (authData) => API.post("/signup", authData);
export const visitorData= (lat, lng) => API.post('/visitorData', lat, lng);
export const mapData= (lat, lng) => API.post('/mapData', lat, lng);
export const toMongo = (weatherData) => API.post("/toMongo", weatherData, {withCredentials: true});
export const fromMongo = (timestamp) => API.get(`/fromMongo/`, timestamp, {withCredentials: true});
export const decrementInteractions = () => API.post ("/decrementInteractions", {withCredentials: true});
export const interactionsLeft = () => API.post ("/interactionsLeft", {withCredentials: true});