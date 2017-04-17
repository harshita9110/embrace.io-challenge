import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './App';
import Favorites from './containers/Favorites';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/favorites" component={Favorites}/>
  </Switch>
);

export default Routes;
