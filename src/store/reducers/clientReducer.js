// Action Types
const SET_USER = 'client/setUser';
const SET_ROLES = 'client/setRoles';
const SET_THEME = 'client/setTheme';
const SET_LANGUAGE = 'client/setLanguage';
const SET_FETCH_STATE = 'client/setFetchState';

// Initial State
const initialState = {
  user: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'tr',
  fetchState: null
};

// Reducer
const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
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

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState
});

// Thunk Action Creator
export const fetchRoles = () => {
  return async (dispatch, getState) => {
    const { roles } = getState().client;
    if (roles && roles.length > 0) {
      return;
    }

    try {
      dispatch(setFetchState('FETCHING'));
      const rolesData = await apiService.getRoles();
      dispatch(setRoles(rolesData));
      dispatch(setFetchState('FETCHED'));
    } catch (error) {
      console.error('Roller yüklenirken hata oluştu:', error);
      dispatch(setFetchState('FAILED'));
    }
  };
};

export default clientReducer;