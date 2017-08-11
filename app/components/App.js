import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, HashRouter, IndexRoute, Route, Switch } from 'react-router-dom';

import StoryAnalytics from './StoryAnalytics';
import StoryList from './StoryList';
import StoryReader from './StoryReader';

class App extends Component {
  static NotFound = () => (
    <div> 404 Not Found </div>
  )
  render() {
    // console.log('^^^^^^^^^^^^^^^^^^^^^^ App');
    if (process.env.NODE_ENV === 'gh') {
      return (
        <HashRouter>
          <Switch>
            <Route exact path="/gushi/:storyId" component={StoryReader} />
            <Route exact path="/gushi/:storyId/stat" component={StoryAnalytics} />
            <Route exact path="/gushi" component={StoryList} />
            <Route component={App.NotFound} />
          </Switch>
        </HashRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/gushi/:storyId" component={StoryReader} />
            <Route exact path="/gushi/:storyId/stat" component={StoryAnalytics} />
            <Route exact path="/gushi" component={StoryList} />
            <Route component={App.NotFound} />
          </Switch>
        </BrowserRouter>
      );
    }
  }
}

export default connect(null, { })(App)
