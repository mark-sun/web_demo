import 'babel-polyfill';

import './reset.scss';
import './global.scss';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import StoryReader from './containers/StoryReader';
import App from './containers/App';
import { Route, Router, browserHistory } from 'react-router';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/story" component={StoryReader} />
        <Route path="/not_found" render={() => <h2>NOT FOUND</h2>} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
);
