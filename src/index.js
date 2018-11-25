import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import App from './components/App';
import { loadCourses } from './actions/courseActions';
import { loadAuthors } from './actions/authorActions';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const history = createBrowserHistory();

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <Router history={history}><App { ...history }/></Router>
  </Provider>, window.document.getElementById('app')
);
