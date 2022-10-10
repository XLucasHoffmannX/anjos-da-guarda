import axios from 'axios';
import Cookies from 'js-cookie';
import { HttpAuth } from '../api/Http';

export const Http = axios.create({
    baseURL: process.env.REACT_APP_URL_ROOT,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const HtppAuth = axios.create({
    baseURL: process.env.REACT_APP_URL_ROOT
});

HttpAuth.interceptors.response.use(res => { return res }, error => {
    if (error.resonse) {
        if (error.response.status === 401) {
            localStorage.removeItem('primaryLogin');
            Cookies.remove('jwt', { path: "/", domain: "localhost" });
            window.location.replace('/login');
        }
    }
});