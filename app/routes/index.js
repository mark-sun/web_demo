import React from 'react';
import {IndexRoute, Route, Router} from 'react-router';

import App from '../containers/App';
import StoryReader from '../containers/StoryReader';

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="story" component={StoryReader} />
        <IndexRoute component={StoryReader} />
      </Route>
    </Router>
  )
}
