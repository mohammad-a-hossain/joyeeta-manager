import authReducers from "./authReducers"
import userReducer from "./userReducer"

import categoryReducer from "./categoryReducer"
import productReducer from "./product.Reducer"
import orderReducer from "./order.reducer"

import { combineReducers } from "redux"



const rootReducer = combineReducers({
    auth:authReducers,
    user:userReducer, 
    category: categoryReducer,
    product: productReducer,
    order: orderReducer
})

export default rootReducer
/* 
import { combineReducers } from "redux";
import authReducers from "./authReducers";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer"
import productReducer from "./product.Reducer";


const rootReducer = combineReducers({
    auth:authReducers,
    user:userReducer,
    category: categoryReducer,
    product: productReducer
})

export default rootReducer */