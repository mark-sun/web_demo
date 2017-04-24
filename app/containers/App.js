import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from "react-router-dom";
import { loadStory } from '../actions/storyActions';
import StoryReader from './StoryReader';

class App extends Component {

  render() {
    console.log('************App.render window=', this.props.location);
    return (
      <div>
        <Link to="/story">Story</Link>
        <Route exact path="/story" component={StoryReader} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { loadStory })(App)
