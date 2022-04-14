import axios from '../helpers/axios';
import { userConstant } from './constant';


export const signup =(user)=>{
    console.log(user)
    return async(dispatch)=>{

        dispatch({type:userConstant.USER_REGISTER_REQUEST})
      const res = await axios.post(`/admin/signup`,{
          ...user
      })
       
      if(res.status === 201){
        
         const {message} =res.data
        
          dispatch({
              type: userConstant.USER_REGISTER_SUCCESS,
              payload:{message}
          })

        }else{
          if(res.status === 400){
              dispatch({
                  type:userConstant.USER_REGISTER_FAILURE,
                  payload:{error: res.data.error}
              })
          }
      }
    
    }
}

// export const isLoggedIn = ()=>{
//     return async dispatch =>{
//         const token = localStorage.getItem('token')

//         if(token){
//             const user =JSON.parse(localStorage.getItem('user')) 
//             dispatch({
//                 type: authConstant.LOGIN_SUCCESS,
//                 payload:{
//                 token,user
//                 }
//             })
           
//         }else{
//             dispatch({
//                 type:authConstant.LOGIN_FAILURE,
//                 payload:{
//                     error:'failed to login'
//                 }
//             })
//         }
//     }
// }
// export const signout =()=>{
//     return async dispatch=>{
//          localStorage.clear()
//       dispatch({
//           type:authConstant.LOGOUT_REQUEST
//       })
//     }
     
// }