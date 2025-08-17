// Action Types
const SET_CATEGORIES = 'product/setCategories';
const SET_PRODUCT_LIST = 'product/setProductList';
const SET_TOTAL = 'product/setTotal';
const SET_FETCH_STATE = 'product/setFetchState';
const SET_LIMIT = 'product/setLimit';
const SET_OFFSET = 'product/setOffset';
const SET_FILTER = 'product/setFilter';

// Initial State
const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'NOT_FETCHED'
};

// Reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

// Action Creators
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

// Thunk Action Creators
export const fetchProducts = (params = {}) => {
  return async (dispatch, getState) => {
    const { limit, offset, filter } = getState().product;
    
    try {
      dispatch(setFetchState('FETCHING'));
      
      const response = await apiService.getProducts({
        limit: params.limit || limit,
        offset: params.offset || offset,
        filter: params.filter !== undefined ? params.filter : filter
      });
      
      dispatch(setProductList(response.products || []));
      dispatch(setTotal(response.total || 0));
      
      if (params.limit !== undefined) dispatch(setLimit(params.limit));
      if (params.offset !== undefined) dispatch(setOffset(params.offset));
      if (params.filter !== undefined) dispatch(setFilter(params.filter));
      
      dispatch(setFetchState('FETCHED'));
    } catch (error) {
      console.error('Ürünler yüklenirken hata oluştu:', error);
      dispatch(setFetchState('FAILED'));
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const categories = await apiService.getCategories();
      dispatch(setCategories(categories));
    } catch (error) {
      console.error('Kategoriler yüklenirken hata oluştu:', error);
    }
  };
};

export default productReducer;