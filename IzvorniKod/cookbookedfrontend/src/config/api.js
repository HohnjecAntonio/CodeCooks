import axios from "axios";

const token = localStorage.getItem("token");

export const API_BASE_URL = "http://localhost:8080/api";

export const api = axios.create({baseURL:API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

export const apiAuth = axios.create({baseURL:API_BASE_URL,
    headers:{
        "Authorization": `"Bearer ${token}"`,
        "Content-Type":"application/json"
    }
})
