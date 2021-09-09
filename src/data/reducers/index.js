import { productDetailsReducer, productListReducer } from './productReducers';

const { combineReducers } = require('redux');

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
});

export default reducer;
