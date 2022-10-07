import { useState, useEffect } from 'react';
import { HttpAuth } from './Http';

export const UserApi = (token: string) => {
    const [isLogged, setIsLogged] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await HttpAuth("/auth/user");

                    if(res.data){
                        setUserData(res.data);
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
        userInfo: [userData, setUserData],
        isLogged: [isLogged, setIsLogged]
    }
}
