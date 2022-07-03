import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as RouterApp, Route, Switch } from 'react-router-dom';
import { ContextState } from '../context/DataProvider';
import { CircularProgress } from "@material-ui/core";
import Errors from '../resources/views/Errors/index.';

// lazy components
const AuthView = lazy(() => import('../resources/views/AuthView'));
const Home = lazy(() => import('../resources/views/Home'));


export default function RouteBrowser() {
    const state: any = useContext(ContextState);

    console.log(state);

    return (
        <RouterApp>
            <Suspense fallback={<div><div className="vh-100 d-flex justify-content-center align-items-center"><CircularProgress /></div></div>}>
                <Switch>
                    <Route exact path="/" component={AuthView} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/error" component={Errors} />
                </Switch>
            </Suspense>
        </RouterApp>
    )
}
