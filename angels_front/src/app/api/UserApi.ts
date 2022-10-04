import { useState, useEffect } from 'react';
import { HttpAuth } from './Http';

export const UserApi = (token: string) => {
    const [isLogged, setIsLogged] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await HttpAuth("/auth/user");

                    if(res.data){
                        setUserInfo(res.data);
                        setIsLogged(true);
                    }
                } catch (err) {
                    alert(err)
                }
            }
            getUser();
        }
    }, [token])

    return {
        userInfo: [userInfo, setUserInfo],
        isLogged: [isLogged, setIsLogged]
    }
}
