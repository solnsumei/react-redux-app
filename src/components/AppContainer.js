import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './course/CoursesPage';
import ManageCoursePage from './course/ManageCoursePage';
import AuthorsPage from './author/AuthorsPage';
import ManageAuthorPage from './author/ManageAuthorPage';
import Page404 from './common/404';

const AppContainer = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/authors" component={AuthorsPage} />
    <Route exact path="/author" component={ManageAuthorPage} />
    <Route path="/author/:id" component={ManageAuthorPage} />
    <Route exact path="/courses" component={CoursesPage} />
    <Route exact path="/course" component={ManageCoursePage} />
    <Route path="/course/:id" component={ManageCoursePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/404" component={Page404} />
    <Route component={Page404} />
  </Switch>
);

export default AppContainer;
