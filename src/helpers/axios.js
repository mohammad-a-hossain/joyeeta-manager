import axios from 'axios'
import {API} from '../apiUrlConfig'
import store from './../Store/index';
import { authConstant } from './../Actions/constant';


const token = window.localStorage.getItem('token')

const axiosIntance = axios.create({
     baseURL: API,
     headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }    
})
// useing axios intercept for handling error before catch or try
axiosIntance.interceptors.request.use((req)=>{
    // getting new token if it expired
    const {auth} = store.getState()
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`
    }
   return req 
})
axiosIntance.interceptors.request.use((res)=>{
    return res
}, (error)=>{
    console.log(error.respone)
    const {status} = error.respone 
    if(status === 500){
        // clear if jwt expired
        localStorage.clear()
        store.dispatch({type:authConstant.LOGOUT_SUCCESS})
    }
    return Promise.reject(error)
})

export default axiosIntance