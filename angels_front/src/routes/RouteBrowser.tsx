import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as RouterApp, Route, Switch } from 'react-router-dom';
import { ContextState } from '../context/DataProvider';
import { CircularProgress } from "@material-ui/core";

// lazy components
const Auth = lazy(() => import('../resources/views/Auth'));

export default function RouteBrowser() {
    const state: any = useContext(ContextState);

    console.log(state);

    return (
        <RouterApp>
            <Suspense fallback={<div><div className="vh-100 d-flex justify-content-center align-items-center"><CircularProgress /></div></div>}>
                <Switch>
                    <Route exact path="/" component={Auth} />
                </Switch>
            </Suspense>
        </RouterApp>
    )
}
