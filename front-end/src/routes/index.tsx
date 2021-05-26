import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Forgot from '../pages/Forgot';
import RestPassword from '../pages/RestPassword';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';


const Routes: React.FC = () => (
    <Switch>
        <Route path='/' exact component={SignIn} />
        <Route path='/forgot' component={Forgot} />
        <Route path='/signup' component={SignUp} />
        <Route path='/reset-password' component={RestPassword} />

        <Route path='/dashboard' component={Dashboard} isPrivate />
        <Route path='/users' component={Users} isPrivate />
    </Switch>
);

export default Routes;