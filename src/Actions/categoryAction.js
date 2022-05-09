import axios from '../helpers/axios';
import { categoryConstant } from './constant';

export const getAllCategory =()=>{
    return async dispatch =>{

        dispatch({type:categoryConstant.GETALLCATEGORY_REQUEST})
        const res = await axios.get(`/category/getCategory`)
        console.log('from action page',res)
        if(res.status === 200){
         const  {categoryList} = res.data
        dispatch({type:categoryConstant.GETALLCATEGORY_SUCCESS,
                  payload:{categories:categoryList
                }
             })
        }else{
        dispatch({type:categoryConstant.GETALLCATEGORY_FAILURE,
                  payload:{ error: res.data.error }
                }
            )
        }
    }
} 

export const addCategory =(form)=>{ 
    return async dispatch =>{
        dispatch({type:categoryConstant.ADDNEW_CATEGORY_REQUEST})

        try{
            const res = await axios.post(`/category/create`,form)
            // console.log(res)
     
             if(res.status === 201){
                 dispatch({type:categoryConstant.ADDNEW_CATEGORY_SUCCESS,
                           payload: {category: res.data.category}  
                         })
             }else{
                 dispatch({type:categoryConstant.ADDNEW_CATEGORY_FAILURE,
                             payload:res.data.error
                            
                           })
             }
        }catch(error){
           console.log(error.response)
        }
      
     }
}

// for edit category
export const updatCategories =(form)=>{ 
    return async dispatch =>{
        // dispatch({type:categoryConstant.UPDATE_CATEGORY_REQUEST})

        // try{
            const res = await axios.post(`/category/updatecate`,form)
            // console.log(res)
     
             if(res.status === 201){
                 console.log(res)
                //  dispatch({type:categoryConstant.ADDNEW_CATEGORY_SUCCESS,
                //            payload: {category: res.data.category}  
                //          })
             }else{
                console.log(res)
                //  dispatch({type:categoryConstant.ADDNEW_CATEGORY_FAILURE,
                //              payload:res.data.error
                            
                //            })
             }
    //     }catch(error){
    //        console.log(error.response)
    //    }
      
     }
}