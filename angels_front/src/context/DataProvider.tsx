import React, { createContext } from 'react'
import Cookies from 'js-cookie';
import { UserApi } from '../app/api/UserApi';
import NotifyApi from '../app/api/NotifyApi';
import ModalsApi from '../app/api/ModalsApi';

export const ContextState = createContext({});


export default function DataProvider({ children }: any) {
	const [token, setToken] = React.useState<boolean | any>(false);
	const [navControl, setNavControl] = React.useState<boolean>(true);

	React.useEffect(() => {
		setToken(Cookies.get('access-token'));
	}, [token, setToken])

	const state = {
		userApi: UserApi(token),
		notifyGeral: NotifyApi(),
		modalsGeral: ModalsApi(),
		navLayout: [navControl, setNavControl]
	}

	return (
		<ContextState.Provider value={state}>
			{children}
		</ContextState.Provider>
	)
}
