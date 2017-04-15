import 'babel-polyfill';

import './reset.scss';
import './global.scss';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import StoryReader from './containers/StoryReader';

ReactDOM.render(
  <Provider store={store}>
    <StoryReader />
  </Provider>,
  document.getElementById('content')
);
