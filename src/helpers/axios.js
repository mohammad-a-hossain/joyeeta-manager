import axios from 'axios'
import {API} from '../apiUrlConfig'


const token = window.localStorage.getItem('token')

const axiosIntance = axios.create({
     baseURL: API,
     headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }    
})

export default axiosIntance