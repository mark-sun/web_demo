import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, IndexRoute, Route, Switch } from 'react-router-dom';

import StoryList from './StoryList';
import StoryReader from './StoryReader';

class App extends Component {
  static NotFound = () => (
    <div> 404 Not Found </div>
  )
  render() {
    // console.log('^^^^^^^^^^^^^^^^^^^^^^ App');
    return (
      <Router>
        <Switch>
          <Route exact path="/stories/:storyId" component={StoryReader} />
          <Route exact path="/stories" component={StoryList} />
          <Route component={App.NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default connect(null, { })(App)
