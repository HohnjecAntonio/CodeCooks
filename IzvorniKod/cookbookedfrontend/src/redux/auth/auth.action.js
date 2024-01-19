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
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
    FETCH_OTHER_PROFILE_FAILURE,
    FETCH_OTHER_PROFILE_SUCCESS,
    FETCH_OTHER_PROFILE_REQUEST,
    ADD_RECIPE_FAILURE,
    ADD_RECIPE_SUCCESS,
    ADD_RECIPE_REQUEST,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_FAILURE,
    FOLLOW_USER_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_REQUEST,
    FETCH_RECIPE_BY_ID_SUCCESS,
    FETCH_RECIPE_BY_ID_REQUEST,
    FETCH_RECIPE_BY_ID_FAILURE,
    FETCH_VRKUHINJE_REQUEST,
    FETCH_VRKUHINJE_SUCCESS, FETCH_VRKUHINJE_FAILURE,
    ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS,ADD_COMMENT_FAILURE,
    EDIT_COMMENT_REQUEST,EDIT_COMMENT_SUCCESS,EDIT_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,DELETE_COMMENT_SUCCESS,DELETE_COMMENT_FAILURE,
    FETCH_RECIPE_BY_USER_FAILURE,FETCH_RECIPE_BY_USER_REQUEST,FETCH_RECIPE_BY_USER_SUCCESS, 
    DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_FAILURE,
    EDIT_RECIPE_FAILURE,EDIT_RECIPE_REQUEST,EDIT_RECIPE_SUCCESS,
    SAVE_RECIPE_FAILURE,SAVE_RECIPE_REQUEST,SAVE_RECIPE_SUCCESS,
    LIKE_RECIPE_FAILURE,LIKE_RECIPE_REQUEST,LIKE_RECIPE_SUCCESS, 
    DELETE_USER_PROFILE_REQUEST, DELETE_USER_PROFILE_SUCCESS, DELETE_USER_PROFILE_FAILURE, FETCH_OTHER_PROFILE_BY_USERNAME_REQUEST, FETCH_OTHER_PROFILE_BY_USERNAME_SUCCESS, FETCH_OTHER_PROFILE_BY_USERNAME_FAILURE, GET_ROLE_REQUEST, GET_ROLE_SUCCESS, GET_ROLE_FAILURE
} from "./auth.actionType";
import { useHistory } from 'react-router-dom';

export const loginUserAction = (loginData) => async (dispatch) => {
    
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);

        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        window.alert("Prijava uspjela!");

        dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    } catch (error) {
        console.log("------", error);
        window.alert("Prijava nije uspjela!");
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
};

export const registerUserAction = (registerData) => async (dispatch) => {
    //const history = useHistory();
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData.data);

        if (data.token) {
            localStorage.setItem("token", data.token);
        }

        window.alert("Registracija uspjela!");

        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    } catch (error) {
        console.log("------", error);
        window.alert("Registracija nije uspjela!");
        dispatch({ type: REGISTER_FAILURE, payload: error });
    }
};


export const deleteUserAction = (requestData) => async (dispatch) => {
    dispatch({ type: DELETE_USER_PROFILE_REQUEST });
    try {
        const { data } = await apiAuth.delete(`${API_BASE_URL}/korisnici/delete/korisnik/${requestData.data.idKorisnik}`);

        console.log("Izbrisan korisnik: ");
        console.log(data);

        dispatch({ type: DELETE_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("------", error);
        dispatch({ type: DELETE_USER_PROFILE_FAILURE, payload: error });
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

//TODO
export const editRecipe = (requestData) => async (dispatch) => {
    dispatch({ type: EDIT_RECIPE_REQUEST });
    try {
        
        const { data } = await apiAuth.put(`${API_BASE_URL}/recepti/edit/${requestData.data.idRecept}/korisnik/${requestData.data.idAutor}`,requestData.data);

        console.log("Uredi recept: ");
        console.log(data);

        dispatch({ type: EDIT_RECIPE_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({ type: EDIT_RECIPE_FAILURE, payload: error });
    }
};


export const deleteRecipe = (requestData) => async (dispatch) => {
    dispatch({ type: DELETE_RECIPE_REQUEST });
    try {
        
        const { data } = await apiAuth.delete(`${API_BASE_URL}/recepti/delete/${requestData.data.idRecept}/korisnik/${requestData.data.idKorisnik}`);

        console.log("Izbrisan recept: ");
        console.log(data);

        dispatch({ type: DELETE_RECIPE_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({ type: DELETE_RECIPE_FAILURE, payload: error });
    }
};


export const saveRecipe = (recipeData) => async (dispatch) => {
    dispatch({ type: SAVE_RECIPE_REQUEST });
    try {
        
        const { data } = await apiAuth.post(`${API_BASE_URL}/recepti/${recipeData.data.idRecept}/save/korisnik/${recipeData.data.idKorisnik}`);

        console.log("Spremljen recept: ");
        console.log(data);
        window.alert("Spremljen recept!");
        dispatch({ type: SAVE_RECIPE_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({ type: SAVE_RECIPE_FAILURE, payload: error });
    }
};

export const likeRecipe = (recipeData) => async (dispatch) => {
    dispatch({ type: LIKE_RECIPE_REQUEST });
    try {
        
        const { data } = await apiAuth.post(`${API_BASE_URL}/recepti/${recipeData.data.idRecept}/like/korisnik/${recipeData.data.idKorisnik}`);

        console.log("Označen recept: ");
        console.log(data);
        window.alert("Označen recept");

        dispatch({ type: LIKE_RECIPE_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({ type: LIKE_RECIPE_FAILURE, payload: error });
    }
};


export const addComment = (commentData) => async (dispatch) => {
    dispatch({ type: ADD_COMMENT_REQUEST });
    try {
        
        const { data } = await apiAuth.post(`${API_BASE_URL}/recepti/${commentData.data.idRecept}/addc/korisnik/${commentData.data.idKorisnik}`, 
        commentData.data);

        console.log("Dodan komentar: ");
        console.log(data);

        dispatch({ type: ADD_COMMENT_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({ type: ADD_COMMENT_FAILURE, payload: error });
    }
};


export const editComment = (commentData) => async (dispatch) => {
    dispatch({ type: EDIT_COMMENT_REQUEST });
    try {
        
        const { data } = 
        await apiAuth.put(`${API_BASE_URL}/recepti/${commentData.data.idRecept}/editc/korisnik/${commentData.data.idKorisnik}`,
        commentData.data);

        console.log("Uređen komentar: ");
        console.log(data);

        dispatch({ type: EDIT_COMMENT_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({ type: EDIT_COMMENT_FAILURE, payload: error });
    }
};


export const deleteComment = (commentData) => async (dispatch) => {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    try {
        
        const { data } = await apiAuth.delete(`${API_BASE_URL}/recepti/${commentData.data.idRecept}/delc/${commentData.data.idKomentar}/korisnik/${commentData.data.idKorisnik}`);

        console.log("Izbrisan komentar: ");
        console.log(data);

        dispatch({ type: DELETE_COMMENT_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({ type: DELETE_COMMENT_FAILURE, payload: error });
    }
};


export const fetchKategorije = () => async (dispatch) => {
    dispatch({ type: FETCH_KATEGORIJE_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/`);

        console.log("Kategorije");
        console.log(data);

        dispatch({ type: FETCH_KATEGORIJE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_KATEGORIJE_FAILURE, payload: error });
    }
};

export const fetchVrsteKuhinje = () => async (dispatch) => {
    dispatch({ type: FETCH_VRKUHINJE_REQUEST });
    try {
        const { data } = await apiAuth.get(`${API_BASE_URL}/recepti/vrstekuhinje`);
        dispatch({ type: FETCH_VRKUHINJE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_VRKUHINJE_FAILURE, payload: error });
    }
};

export const fetchRecipesForUserFeed = () => async (dispatch) => {
    dispatch({ type: FETCH_RECIPES_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/recepti`);

        console.log("Fetched recipes");
        console.log(data);

        dispatch({ type: FETCH_RECIPES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_RECIPES_FAILURE, payload: error });
    }
};


export const fetchRecipeById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_RECIPE_BY_ID_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/recepti/${id}`);

        console.log("Fetched recipe by id");
        console.log(data);

        dispatch({ type: FETCH_RECIPE_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_RECIPE_BY_ID_FAILURE, payload: error });
    }
};

export const fetchRecipesByUser = (id) => async (dispatch) => {
    dispatch({ type: FETCH_RECIPE_BY_USER_REQUEST });
    try {
        const { data } = await apiAuth.get(`${API_BASE_URL}/recepti/korisnik/${id}`);

        console.log("Fetched recipe by user id");
        console.log(data);

        dispatch({ type: FETCH_RECIPE_BY_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_RECIPE_BY_USER_FAILURE, payload: error });
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

        //console.log("Profile to load data: ");
        //console.log(data);

        dispatch({ type: FETCH_OTHER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_OTHER_PROFILE_FAILURE, payload: error });
    }
};


export const fetchOtherProfileByUsername = (korisnickoIme) => async (dispatch) => {
    dispatch({ type: FETCH_OTHER_PROFILE_BY_USERNAME_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/korisnici/profileDK/${korisnickoIme}`);

        console.log("Profile to load data: ");
        console.log(data);

        dispatch({ type: FETCH_OTHER_PROFILE_BY_USERNAME_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_OTHER_PROFILE_BY_USERNAME_FAILURE, payload: error });
    }
};

export const updateUserProfile = (profileData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
    try {
        console.log(profileData);
        const { data } = await apiAuth.put(`${API_BASE_URL}/korisnici/update/${profileData.data.idKorisnik}`, profileData.data);

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



export const getUserRole = (id) => async (dispatch) => {
    dispatch({ type: GET_ROLE_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/korisnici/role/${id}`);

        console.log("Profile to load data: ");
        console.log(data);

        dispatch({ type: GET_ROLE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ROLE_FAILURE, payload: error });
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};

export const getCurrentUser = () => {
    return localStorage.getItem("token");
};

