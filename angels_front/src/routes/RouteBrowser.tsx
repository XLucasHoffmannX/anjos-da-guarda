import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as RouterApp, Route, Switch } from 'react-router-dom';
import { ContextState } from '../context/DataProvider';
import { CircularProgress } from "@material-ui/core";
import PrivateRoute from '../app/hooks/PrivateRoute';
import RedirectLogged from '../resources/views/RedirectLogged';
import { NotFound, Revoked } from '../resources/views/Errors/index.';
import Nav from '../resources/components/Nav';
import SideBar from '../resources/components/SideBar';

// lazy components
const AuthView = lazy(() => import('../resources/views/AuthView'));
const Home = lazy(() => import('../resources/views/Home'));
const User = lazy(() => import('../resources/views/User'));
const Users = lazy(() => import('../resources/views/Users'));
const CreateUser = lazy(() => import('../resources/views/Users/create'));
const Patients = lazy(() => import('../resources/views/Patients'));
const CreatePatient = lazy(() => import('../resources/views/Patients/create'));
const Medicamento = lazy(() => import('../resources/views/Medicamento'));
const Control = lazy(() => import('../resources/views/Control'));
const CreateControl = lazy(() => import('../resources/views/Control/create'));
const Monitoring = lazy(() => import('../resources/views/Monitoring'));

export default function RouteBrowser() {
    const state: any = useContext(ContextState);
    //console.log(state.userApi);
    return (
        <RouterApp>
            <SideBar />
            <Nav />
            <Suspense fallback={<div><div className="vh-100 d-flex justify-content-center align-items-center"><CircularProgress /></div></div>}>
                <Switch>
                    <Route exact path="/" component={RedirectLogged} />
                    <Route exact path="/login" component={AuthView} />

                    <PrivateRoute path="/private" roleUser={state} rule={[1]} >
                        <Home />
                    </PrivateRoute>

                    <PrivateRoute path="/home"> <Home /> </PrivateRoute>
                    <PrivateRoute path="/perfil"> <User /> </PrivateRoute>
                    <PrivateRoute path="/users"> <Users /> </PrivateRoute>
                    <PrivateRoute path="/create-user"> <CreateUser /> </PrivateRoute>
                    <PrivateRoute path="/edit-user/:id"> <CreateUser /> </PrivateRoute>
                    <PrivateRoute path="/patients"> <Patients /> </PrivateRoute>
                    <PrivateRoute path="/create-patient"> <CreatePatient /> </PrivateRoute>
                    <PrivateRoute path="/edit-patient/:id"> <CreatePatient /> </PrivateRoute>

                    <PrivateRoute path="/medicamento"> <Medicamento /> </PrivateRoute>
                    <PrivateRoute path="/control"> <Control /> </PrivateRoute>
                    <PrivateRoute path="/create-control"> <CreateControl /> </PrivateRoute>
                    
                    <PrivateRoute path="/monitor"> <Monitoring /> </PrivateRoute>


                    <Route path="*" component={NotFound} />
                </Switch>
            </Suspense>
        </RouterApp>
    )
}
