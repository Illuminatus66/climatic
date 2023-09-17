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
export const toMongo = (data) => API.post("/toMongo", data, {withCredentials: true});
export const fromMongo = (timestamp) => API.get("/fromMongo", timestamp, {withCredentials: true});
export const decrementInteractions = (_id) => API.post ("/decrementInteractions", { _id }, {withCredentials: true});
export const interactionsLeft = (_id) => API.post ("/interactionsLeft", { _id }, {withCredentials: true});