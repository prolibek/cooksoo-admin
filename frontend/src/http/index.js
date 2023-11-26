import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {

    let token = localStorage.getItem('authtoken');

    if(token) 
        config.headers.Authorization = `Token ${token}`;
    return config;
})

export default $api;