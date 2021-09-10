import { productDetailsReducer, productListReducer } from './productReducers';
import { cartReducer } from './cartReducers';

const { combineReducers } = require('redux');

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
});

export default reducer;
