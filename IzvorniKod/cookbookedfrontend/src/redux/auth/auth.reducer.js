import {
    FETCH_KATEGORIJE_FAILURE,
    FETCH_KATEGORIJE_REQUEST,
    FETCH_KATEGORIJE_SUCCESS,
    FETCH_RECIPES_FAILURE,
    FETCH_RECIPES_REQUEST,
    FETCH_RECIPES_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_OTHER_PROFILE_FAILURE,
    FETCH_OTHER_PROFILE_SUCCESS,
    FETCH_OTHER_PROFILE_REQUEST,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
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
    FETCH_VRKUHINJE_FAILURE, FETCH_VRKUHINJE_SUCCESS,
    EDIT_COMMENT_REQUEST,EDIT_COMMENT_SUCCESS,EDIT_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,DELETE_COMMENT_SUCCESS,DELETE_COMMENT_FAILURE,
    FETCH_RECIPE_BY_USER_FAILURE,FETCH_RECIPE_BY_USER_REQUEST,FETCH_RECIPE_BY_USER_SUCCESS, 
    DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_FAILURE, 
    FETCH_OTHER_PROFILE_BY_USERNAME_SUCCESS, FETCH_OTHER_PROFILE_BY_USERNAME_FAILURE, FETCH_OTHER_PROFILE_BY_USERNAME_REQUEST

} from "./auth.actionType";

const initialState = {
    token: null,
    error: null,
    loading: false,
    kategorije: [],
    recipesForFeed: [],
    userProfile: '',
    profileToLoad: '',
    recipeToLoad: '',
    recipesByUser: [],
    vrKuhinje: [],
    userRole: ''
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

        case FETCH_VRKUHINJE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_VRKUHINJE_SUCCESS:
            return { ...state, vrKuhinje: action.payload, loading: false, error: null };
        case FETCH_VRKUHINJE_FAILURE:
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

        case FETCH_OTHER_PROFILE_BY_USERNAME_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_OTHER_PROFILE_BY_USERNAME_SUCCESS:
            return { ...state, profileToLoad: action.payload, loading: false, error: null };
        case FETCH_OTHER_PROFILE_BY_USERNAME_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_USER_PROFILE_REQUEST:
           
        case UPDATE_USER_PROFILE_SUCCESS:
        
        case UPDATE_USER_PROFILE_FAILURE:
            


        case FOLLOW_USER_REQUEST:
           
        case FOLLOW_USER_SUCCESS:
        
        case FOLLOW_USER_FAILURE:


        case FETCH_RECIPE_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_RECIPE_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_RECIPE_BY_ID_SUCCESS:
            return { ...state, recipeToLoad: action.payload, loading: false, error: null };

        case FETCH_RECIPE_BY_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_RECIPE_BY_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_RECIPE_BY_USER_SUCCESS:
            return { ...state, recipesByUser: action.payload, loading: false, error: null };

        case EDIT_COMMENT_FAILURE:
        
        case EDIT_COMMENT_REQUEST:
        
        case EDIT_COMMENT_SUCCESS:



        case DELETE_COMMENT_FAILURE:
        
        case DELETE_COMMENT_REQUEST:
        
        case DELETE_COMMENT_SUCCESS:


        case DELETE_RECIPE_FAILURE:
        
        case DELETE_RECIPE_REQUEST:
        
        case DELETE_RECIPE_SUCCESS:

        default:
            return state;

    }
}