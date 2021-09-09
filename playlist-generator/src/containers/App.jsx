import React from 'react';
import '../styles/App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from '.';
import { LoginPage } from './LoginPage';
import { AuthCallback } from './AuthCallback';
import { NotFoundPage } from './NotFoundPage';
import { initialAppContext, spotifyAppContext } from '../utils/Context';

export const App = () => {
    return (
        <spotifyAppContext.Provider value={initialAppContext}>
            <div className="app">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact>
                            <HomePage />
                        </Route>
                        <Route path="/login" exact>
                            <LoginPage />
                        </Route>
                        <Route path="/callback" exact>
                            <AuthCallback />
                        </Route>
                        <Route path="*" exact>
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </spotifyAppContext.Provider>
    );
};
