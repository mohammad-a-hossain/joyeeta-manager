

import {productsConstant} from './../Actions/constant'


const initialState = {
    products: []
   
}

export default (state = initialState, action) => {

    switch(action.type){
        case productsConstant.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
               
            }
            break;
            case productsConstant.GET_ALL_PRODUCTS_FAILURE:
            state = {
                
                ...initialState,
                loading: false,
                error: action.payload.error
               
            }
            break;
            
    }

    return state;
}