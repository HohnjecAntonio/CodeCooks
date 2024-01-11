import axios from "axios";
import {api, API_BASE_URL} from "../../config/api";
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    FETCH_KATEGORIJE_SUCCESS,
    FETCH_KATEGORIJE_REQUEST,
    FETCH_KATEGORIJE_FAILURE
} from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);

        if (data.token) {
            localStorage.setItem("token", data.token);
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
};

export const registerUserAction = (registerData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData.data);

        if (data.token) {
            localStorage.setItem("token", data.token);
        }

        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: REGISTER_FAILURE, payload: error });
    }
};

export const fetchKategorije = () => async (dispatch) => {
    dispatch({ type: FETCH_KATEGORIJE_REQUEST });
    try {
        const { data } = await api.get(`${API_BASE_URL}/`);
        dispatch({ type: FETCH_KATEGORIJE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_KATEGORIJE_FAILURE, payload: error });
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};

export const getCurrentUser = () => {
    return localStorage.getItem("token");
};
