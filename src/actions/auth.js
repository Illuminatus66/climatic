import * as api from "../api";
import { fetchCurrentUser } from "../reducers/userSlice";
import { resetInteractions } from '../reducers/interactionsSlice'
import { login } from "../reducers/authSlice"

export const signUp = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch(login(data));
    dispatch(fetchCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const logIn = (authData, navigate) => async (dispatch) => {
    dispatch (resetInteractions());
    const { data } = await api.logIn(authData);
    dispatch(login(data));
    dispatch(fetchCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
};
