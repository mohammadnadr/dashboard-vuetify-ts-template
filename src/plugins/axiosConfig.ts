import axios from 'axios';  

const baseURL = "http://194.5.188.178:5001/api/v1";  
// const baseURL = "http://212.16.73.121:5001/api/v1";  

const axiosInstance = axios.create({  
  baseURL: baseURL,  
  timeout: 10000, // Optional: set a timeout  
  headers: {  
    'Content-Type': 'application/json', // Optional: set default headers  
  },  
});  

export default axiosInstance;