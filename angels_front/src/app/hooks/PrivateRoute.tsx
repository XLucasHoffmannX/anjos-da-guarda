import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }: any) {
    const getItem = localStorage.getItem('primaryLogin') === 'true';
    return (
        <Route
            {...rest}
            render={({ location }) =>
                getItem ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
