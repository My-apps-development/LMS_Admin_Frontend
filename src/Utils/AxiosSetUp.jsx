// import axios from "axios"

// export const BASE_URL = "https://myappsdevelopment.co.in"



// const userToken = JSON.parse(localStorage.getItem("token"));
// console.log('AXIOS TOKEN', userToken)




// export const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: userToken ? `Bearer ${userToken}` : null,
       
        
//     }
// })


import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const BASE_URL = "https://myappsdevelopment.co.in";

let userToken;
try {
  userToken = JSON.parse(localStorage.getItem("token"));
} catch (error) {
  console.error("Invalid token in localStorage", error);
  userToken = null;
  localStorage.removeItem("token")
}

const userRole = localStorage.getItem("role");
console.log('AXIOS TOKEN', userToken);
console.log('ROLE', userRole); // Assuming role is a simple string, no need to parse



export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: userToken ? { Authorization: `Bearer ${userToken}` } : {},
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      localStorage.removeItem("token");
      localStorage.clear()
      // Redirect to login page or any other desired location
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);




