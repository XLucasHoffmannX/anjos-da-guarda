import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as RouterApp, Route, Switch, Redirect } from 'react-router-dom';
import { ContextState } from '../context/DataProvider';
import { CircularProgress } from "@material-ui/core";
import Errors from '../resources/views/Errors/index.';
import Authenticated from '../app/api/Authenticated';

// lazy components
const AuthView = lazy(() => import('../resources/views/AuthView'));
const Home = lazy(() => import('../resources/views/Home'));


// Private Routes
const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={props =>
            Authenticated() ? (
                <Component {...rest} {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);


export default function RouteBrowser() {
    const state: any = useContext(ContextState);

    console.log(state);

    return (
        <RouterApp>
            <Suspense fallback={<div><div className="vh-100 d-flex justify-content-center align-items-center"><CircularProgress /></div></div>}>
                <Switch>
                    <Route exact path="/" component={AuthView} />
                    <PrivateRoute path="/home" component={Home} />
                    {/* <Route exact path="/home" component={Home} /> */}
                    <Route exact path="/error" component={Errors} />
                </Switch>
            </Suspense>
        </RouterApp>
    )
}
