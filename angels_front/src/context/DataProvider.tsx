import React, { createContext } from 'react'
import Cookies from 'js-cookie';
import { UserApi } from '../app/api/UserApi';
import NotifyApi from '../app/api/NotifyApi';

export const ContextState = createContext({});


export default function DataProvider({ children }: any) {
  const [token, setToken] = React.useState<boolean | any>(false);

  React.useEffect(() => {
    setToken(Cookies.get('access-token'));
  }, [token, setToken])

  const state = {
    userApi: UserApi(token),
    notifyGeral: NotifyApi()
  }

  return (
    <ContextState.Provider value={state}>
      {children}
    </ContextState.Provider>
  )
}
