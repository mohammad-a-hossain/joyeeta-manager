import axios from '../helpers/axios';
import {
        categoryConstant,
        productsConstant,} from './constant';



export const getAllData =()=>{
    return async dispatch =>{
        
        const res = await axios.post(`/getAllData`)
       // console.log(res)
        if(res.status === 200){
            const { categories,products} = res.data 
            dispatch({
                type:categoryConstant.GETALLCATEGORY_SUCCESS,
                payload:{categories},
            })
            dispatch({
                type:productsConstant.GET_ALL_PRODUCTS_SUCCESS,
                payload:{products},
                
            })
        }
       //console.log(res);
    }
}