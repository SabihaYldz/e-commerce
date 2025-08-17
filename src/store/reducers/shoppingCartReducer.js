// Action Types
const SET_CART = 'shoppingCart/setCart';
const SET_PAYMENT = 'shoppingCart/setPayment';
const SET_ADDRESS = 'shoppingCart/setAddress';

// Yardımcı Fonksiyonlar
const findProductIndex = (cart, productId) => {
  return cart.findIndex(item => item.product.id === productId);
};

// Initial State
const initialState = {
  cart: [], // { count: number, product: object }[]
  payment: null,
  address: null
};

// Reducer
const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    default:
      return state;
  }
};

// Action Creators
export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address
});

// Sepet İşlemleri İçin Action Creators
export const addToCart = (product, quantity = 1) => {
  return (dispatch, getState) => {
    const { cart } = getState().shoppingCart;
    const existingIndex = findProductIndex(cart, product.id);
    
    let newCart;
    if (existingIndex >= 0) {
      newCart = [...cart];
      newCart[existingIndex] = {
        ...newCart[existingIndex],
        count: newCart[existingIndex].count + quantity
      };
    } else {
      newCart = [...cart, { product, count: quantity }];
    }
    
    dispatch(setCart(newCart));
  };
};

export const removeFromCart = (productId) => {
  return (dispatch, getState) => {
    const { cart } = getState().shoppingCart;
    const newCart = cart.filter(item => item.product.id !== productId);
    dispatch(setCart(newCart));
  };
};

export const updateCartItemQuantity = (productId, quantity) => {
  return (dispatch, getState) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(productId));
      return;
    }
    
    const { cart } = getState().shoppingCart;
    const existingIndex = findProductIndex(cart, productId);
    
    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex] = {
        ...newCart[existingIndex],
        count: quantity
      };
      dispatch(setCart(newCart));
    }
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch(setCart([]));
  };
};

// Selectors
export const selectCartTotal = (state) => {
  return state.shoppingCart.cart.reduce((total, item) => {
    return total + (item.product.price * item.count);
  }, 0);
};

export const selectCartItemCount = (state) => {
  return state.shoppingCart.cart.reduce((count, item) => {
    return count + item.count;
  }, 0);
};

export default shoppingCartReducer;