import 'babel-polyfill';
import './reset.scss';
import './global.scss';

import App from './containers/App';
import { HashRouter as Router, Route  } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('content')
);
