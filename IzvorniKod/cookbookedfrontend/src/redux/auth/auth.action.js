import axios from "axios";
import {api, API_BASE_URL, apiAuth} from "../../config/api";
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    FETCH_KATEGORIJE_SUCCESS,
    FETCH_KATEGORIJE_REQUEST,
    FETCH_KATEGORIJE_FAILURE,
    FETCH_RECIPES_REQUEST,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,
    FETCH_USER_PROFILE_REQUEST, FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAILURE,
    FETCH_OTHER_PROFILE_FAILURE, FETCH_OTHER_PROFILE_SUCCESS,FETCH_OTHER_PROFILE_REQUEST,
    ADD_RECIPE_FAILURE, ADD_RECIPE_SUCCESS, ADD_RECIPE_REQUEST,
    FOLLOW_USER_REQUEST,FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_REQUEST
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

export const newRecipe = (recipeData) => async (dispatch) => {
    dispatch({ type: ADD_RECIPE_REQUEST });
    try {
        
        const { data } = await apiAuth.post(`${API_BASE_URL}/recepti/save/korisnik/${recipeData.data.idKorisnik}`, recipeData.data,recipeData.data.idKorisnik);

        console.log("Dodan novi recept: ");
        console.log(data);

        dispatch({ type: ADD_RECIPE_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({ type: ADD_RECIPE_FAILURE, payload: error });
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

export const fetchRecipesForUserFeed = () => async (dispatch) => {
    dispatch({ type: FETCH_RECIPES_REQUEST });
    try {
        const { data } = await apiAuth.get(`${API_BASE_URL}/recepti`);

        console.log("Fetched recipes");
        console.log(data);

        dispatch({ type: FETCH_RECIPES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_RECIPES_FAILURE, payload: error });
    }
};

export const fetchUserProfile = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_USER_PROFILE_REQUEST });
    try {
        const { data } = await apiAuth.get(`${API_BASE_URL}/korisnici/profile`);

        console.log("Fetched user profile" );
        console.log(data);

        dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_USER_PROFILE_FAILURE, payload: error });
    }
};

export const fetchOtherProfile = (id) => async (dispatch) => {
    dispatch({ type: FETCH_OTHER_PROFILE_REQUEST });
    try {
        const { data } = await apiAuth.get(`${API_BASE_URL}/korisnici/id/${id}`);

        console.log("Profile to load data: ");
        console.log(data);

        dispatch({ type: FETCH_OTHER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_OTHER_PROFILE_FAILURE, payload: error });
    }
};

export const updateUserProfile = (profileData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
    try {
        console.log(profileData);
        const { data } = await apiAuth.post(`${API_BASE_URL}/korisnici/update/${profileData.data.korisnickoIme}`, profileData.data);

        console.log("Updated data: ");
        console.log(data);

        dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: UPDATE_USER_PROFILE_FAILURE, payload: error });
    }
};


export const followUser = (requestData) => async (dispatch) => {
    dispatch({ type: FOLLOW_USER_REQUEST });
    try {
        const { data } = await apiAuth.post(`${API_BASE_URL}/korisnici/${requestData.data.followerId}/follow/${requestData.data.followingId}`);

        console.log(requestData.data.followerId + " followed user: " + requestData.data.followingId);

        dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: FOLLOW_USER_FAILURE, payload: error });
    }
};


export const logoutUser = () => {
    localStorage.removeItem("token");
};

export const getCurrentUser = () => {
    return localStorage.getItem("token");
};

