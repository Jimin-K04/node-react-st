import axios from 'axios';
import{
    LOGIN_USER,
    REGISTER_USER
}from "./types";

export function loginUser(dataToSubmit){
    const request = axios.post("http://localhost:5000/api/users/login", dataToSubmit) //backend 에서 데이터 가져옴옴
    .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request, //backend data
    }
}

export function registerUser(dataToSubmit){
    const request = axios.post("http://localhost:5000/api/users/register", dataToSubmit) //backend 에서 데이터 가져옴옴
    .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request, //backend data
    }
}

