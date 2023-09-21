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
export const toMongo = (userId, lat, lng, place) => API.post("/toMongo", { userId, lat, lng, place }, {withCredentials: true});
export const fromMongo = (userId, startDate, endDate) => {
  return API.get(`/fromMongo?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
};

export const interactionsLeft = (_id) => API.post ("/interactionsLeft", { _id });