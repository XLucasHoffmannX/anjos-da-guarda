import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as RouterApp, Route, Switch } from 'react-router-dom';
import { ContextState } from '../context/DataProvider';
import { CircularProgress } from "@material-ui/core";

// lazy components
const Home = lazy(() => import('../resources/views/Home'));


export default function RouteBrowser() {
    const state: any = useContext(ContextState);

    console.log(state);

    return (
        <RouterApp>
            <Suspense fallback={<div><div className="vh-100 d-flex justify-content-center align-items-center"><CircularProgress /></div></div>}>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Suspense>
        </RouterApp>
    )
}
