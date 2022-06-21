import axios from 'axios';
import Cookies from 'js-cookie';

export const Http = axios.create({
    baseURL: process.env.REACT_APP_URL_ROOT,
});

export const HttpAuth = axios.create({
    baseURL: process.env.REACT_APP_URL_ROOT
})

/* request */
HttpAuth.interceptors.request.use(
    async (config: any) => {
        config.headers.authorization = `Bearer ${Cookies.get('access-token')}`;

        return config;
    }
);

/* response */
HttpAuth.interceptors.response.use( res => {return res}, error=>{
    if(error.response){
        if(error.response.status === 401) {
            Cookies.remove('access-token');

            window.location.replace('login');
        }
    }
})