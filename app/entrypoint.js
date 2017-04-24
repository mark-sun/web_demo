import 'babel-polyfill';

import './reset.scss';
import './global.scss';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import StoryReader from './containers/StoryReader';
import App from './containers/App';
import { Route, HashRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/story" component={StoryReader} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('content')
);
