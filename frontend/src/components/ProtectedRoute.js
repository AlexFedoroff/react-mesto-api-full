import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {
        // eslint-disable-next-line react/jsx-props-no-spreading
        () => (props.isLoggedIn === true ? <Component {...props} /> : <Redirect to="./sign-in" />)
      }
    </Route>
  );
}

export default ProtectedRoute;
