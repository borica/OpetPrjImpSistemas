import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Forgot from '../pages/Forgot';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
    <Switch>
        <Route path='/' exact component={SignIn} />
        <Route path='/forgot' component={Forgot} />
        <Route path='/signup' component={SignUp} />

        <Route path='/dashboard' component={Dashboard} isPrivate />
    </Switch>
);

export default Routes;