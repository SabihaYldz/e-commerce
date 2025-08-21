// Action Types
const SET_USER = 'client/setUser';
const CLEAR_USER = 'client/clearUser';
const SET_ROLES = 'client/setRoles';
const SET_THEME = 'client/setTheme';
const SET_LANGUAGE = 'client/setLanguage';
const SET_FETCH_STATE = 'client/setFetchState';
const LOGIN_REQUEST = 'client/loginRequest';
const LOGIN_SUCCESS = 'client/loginSuccess';
const LOGIN_FAILURE = 'client/loginFailure';

// Initial State
const initialState = {
  user: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'tr',
  fetchState: null,
  loading: false,
  error: null
};

// Reducer
const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        user: action.payload, 
        error: null 
      };
    case LOGIN_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    case SET_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, user: null };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    default:
      return state;
  }
};

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const clearUser = () => ({
  type: CLEAR_USER
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

// Thunk Action
export const loginUser = (email, password, rememberMe = false) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await login(email, password, rememberMe);
    
    // Token işlemleri artık login fonksiyonu içinde yapılıyor
    dispatch(loginSuccess(response.user));
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export default clientReducer;