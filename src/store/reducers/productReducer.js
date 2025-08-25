const SET_CATEGORIES = 'product/setCategories';
const SET_PRODUCT_LIST = 'product/setProductList';
const SET_TOTAL = 'product/setTotal';
const SET_FETCH_STATE = 'product/setFetchState';
const SET_LIMIT = 'product/setLimit';
const SET_OFFSET = 'product/setOffset';
const SET_FILTER = 'product/setFilter';

// Örnek Kategoriler
const SAMPLE_CATEGORIES = [
  { id: 1, name: 'Giyim', gender: 'kadin', slug: 'giyim' },
  { id: 2, name: 'Ayakkabı', gender: 'kadin', slug: 'ayakkabi' },
  { id: 3, name: 'Çanta', gender: 'kadin', slug: 'canta' },
  { id: 4, name: 'Aksesuar', gender: 'kadin', slug: 'aksesuar' },
  { id: 5, name: 'Giyim', gender: 'erkek', slug: 'giyim' },
  { id: 6, name: 'Ayakkabı', gender: 'erkek', slug: 'ayakkabi' },
  { id: 7, name: 'Çanta', gender: 'erkek', slug: 'canta' },
  { id: 8, name: 'Aksesuar', gender: 'erkek', slug: 'aksesuar' },
];

// Initial State
const initialState = {
  categories: SAMPLE_CATEGORIES, // Varsayılan olarak örnek kategorileri ekledik
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'FETCHED' // Doğrudan yüklendi olarak işaretliyoruz
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
      
      // Burada örnek ürünler dönebiliriz veya boş bırakabiliriz
      const sampleProducts = [];
      
      dispatch(setProductList(sampleProducts));
      dispatch(setTotal(sampleProducts.length));
      
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

// Kategoriler için artık API çağrısı yapmıyoruz, doğrudan örnek verileri dönüyoruz
export const fetchCategories = () => {
  return (dispatch) => {
    try {
      console.log('Örnek kategoriler yüklendi');
      dispatch(setCategories(SAMPLE_CATEGORIES));
    } catch (error) {
      console.error('Kategoriler yüklenirken hata oluştu:', error);
      // Hata durumunda bile örnek kategorileri gönderiyoruz
      dispatch(setCategories(SAMPLE_CATEGORIES));
    }
  };
};

export default productReducer;

