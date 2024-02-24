import axios from "axios"

export const BASE_URL = "https://myappsdevelopment.co.in"



const userToken = JSON.parse(localStorage.getItem("token"));
console.log('AXIOS TOKEN', userToken)


export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: userToken ? `Bearer ${userToken}` : null,
       
        
    }
})
