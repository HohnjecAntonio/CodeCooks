import {
    FETCH_KATEGORIJE_FAILURE,
    FETCH_KATEGORIJE_REQUEST,
    FETCH_KATEGORIJE_SUCCESS,
    FETCH_RECIPES_FAILURE,
    FETCH_RECIPES_REQUEST,
    FETCH_RECIPES_SUCCESS, FETCH_USER_PROFILE_FAILURE,
    FETCH_USER_PROFILE_REQUEST, FETCH_USER_PROFILE_SUCCESS,
    FETCH_OTHER_PROFILE_FAILURE, FETCH_OTHER_PROFILE_SUCCESS,FETCH_OTHER_PROFILE_REQUEST,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    ADD_RECIPE_FAILURE, ADD_RECIPE_SUCCESS, ADD_RECIPE_REQUEST,
    FOLLOW_USER_REQUEST,FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_REQUEST
} from "./auth.actionType";

const initialState = {
    token: null,
    error: null,
    loading: false,
    kategorije: [],
    recipesForFeed: [],
    userProfile: '',
    profileToLoad: '',
}

export const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {...state, loading:true, error:null}

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {...state, jwt:action.payload, loading:false, error:null}

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {...state, loading:false, error:action.payload}


        case FETCH_KATEGORIJE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_KATEGORIJE_SUCCESS:
            return { ...state, kategorije: action.payload, loading: false, error: null };
        case FETCH_KATEGORIJE_FAILURE:
            return { ...state, loading: false, error: action.payload };


        case FETCH_RECIPES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_RECIPES_SUCCESS:
            return { ...state, recipesForFeed: action.payload, loading: false, error: null };
        case FETCH_RECIPES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ADD_RECIPE_REQUEST:
           
        case ADD_RECIPE_SUCCESS:
            
        case ADD_RECIPE_FAILURE:
            

        case FETCH_USER_PROFILE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USER_PROFILE_SUCCESS:
            return { ...state, userProfile: action.payload, loading: false, error: null };
        case FETCH_USER_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };


        case FETCH_OTHER_PROFILE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_OTHER_PROFILE_SUCCESS:
            return { ...state, profileToLoad: action.payload, loading: false, error: null };
        case FETCH_OTHER_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_USER_PROFILE_REQUEST:
           
        case UPDATE_USER_PROFILE_SUCCESS:
        
        case UPDATE_USER_PROFILE_FAILURE:
            


        case FOLLOW_USER_REQUEST:
           
        case FOLLOW_USER_SUCCESS:
        
        case FOLLOW_USER_FAILURE:
            

        default:
            return state;

    }
}