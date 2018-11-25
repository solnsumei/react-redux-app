import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';

export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="about" component={AboutPage} />
  </Switch>
);
