import Cookies from "js-cookie";
import { AuthInterface } from "../../types/interfaces/auth.interface.";
import { Http } from "./Http";

export class Auth {
    async set(route: string, login: AuthInterface) {
        await Http.post(route, {
            ...login
        }).then(async res => {
            Cookies.set('access-token', res.data.access);
            if (res.data.token && Cookies.get('access-token')) {
                window.location.href = '/h';
            }
        }
        );
    }
}