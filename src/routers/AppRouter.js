import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { LoginScreen } from '../Components/auth/LoginScreen';
import { HomeScreen } from '../Components/private/HomeScreen';


export const AppRouter = () => {

    const [ token, setToken ] = useState( null );

    useEffect(() => {
        
        setToken( localStorage.getItem( 'token' ) || '' );
    }, [] );

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        path="/auth"
                        component={ LoginScreen }
                        isAuthenticated= { !!token }
                        setToken={ setToken }
                    />

                    <PrivateRoute
                        path="/"
                        component={ HomeScreen }
                        isAuthenticated= { !!token }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
