import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import * as page from './pages/index';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/panel">
                    <page.Panel />
                </Route>
                <Route path="/login">
                    <page.Login />
                </Route>
                <Route path="/trash">
                    <page.Trash />
                </Route>
                <Route exact path="/">
                    <page.Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
