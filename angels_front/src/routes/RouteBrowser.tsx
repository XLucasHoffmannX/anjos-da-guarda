import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as RouterApp, Route, Switch } from 'react-router-dom';
import { ContextState } from '../context/DataProvider';
import { CircularProgress } from "@material-ui/core";
import PrivateRoute from '../app/hooks/PrivateRoute';
import RedirectLogged from '../resources/views/RedirectLogged';
import TestPrivate from '../resources/views/private/TestPrivate';
import { NotFound, Revoked } from '../resources/views/Errors/index.';


// lazy components
const AuthView = lazy(() => import('../resources/views/AuthView'));
const Home = lazy(() => import('../resources/views/Home'));
const User = lazy(() => import('../resources/views/User'));
const Users = lazy(() => import('../resources/views/Users'));


export default function RouteBrowser() {
    const state: any = useContext(ContextState);
    //console.log(state.userApi);
    return (
        <RouterApp>
            <Suspense fallback={<div><div className="vh-100 d-flex justify-content-center align-items-center"><CircularProgress /></div></div>}>
                <Switch>
                    <Route exact path="/" component={RedirectLogged} />
                    <Route exact path="/login" component={AuthView} />

                    <PrivateRoute path="/private" roleUser={state} rule={[1]} >
                        <TestPrivate />
                    </PrivateRoute>

                    <PrivateRoute path="/home"> <Home /> </PrivateRoute>
                    <PrivateRoute path="/perfil"> <User /> </PrivateRoute>
                    <PrivateRoute path="/users"> <Users /> </PrivateRoute>

                    <Route path="*" component={NotFound} />
                </Switch>
            </Suspense>
        </RouterApp>
    )
}
