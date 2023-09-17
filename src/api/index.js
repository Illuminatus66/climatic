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
export const visitorData= (lat, lng) => API.post("/visitorData", { lat, lng });
export const mapData= (lat, lng) => API.post("/mapData", { lat, lng });
export const toMongo = (userId, lat, lng, place, weather) => API.post("/toMongo", { userId, lat, lng, place, weather }, {withCredentials: true});
export const fromMongo = (userId, timestamp) => API.get("/fromMongo", {userId, timestamp}, {withCredentials: true});
export const decrementInteractions = (userId) => API.post ("/decrementInteractions", { userId }, {withCredentials: true});
export const interactionsLeft = (userId) => API.post ("/interactionsLeft", { userId } , {withCredentials: true});