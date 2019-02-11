import React, {Component} from 'react';
import {
  Route,
  Redirect,

} from 'react-router-dom';
import auth from '../../auth'

const PrivateRoute = ({component: Component, ...rest}) => ( // used to create a protected route 
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated
        ? <Component {...props} />
        : <Redirect to="/signin" />}
  />
);

export default PrivateRoute;
