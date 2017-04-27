import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadStory } from '../actions/storyActions';
import queryString from 'query-string';
import StoryReader from './StoryReader';

class App extends Component {

  componentWillMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.props.loadStory({ storyId: parsed.storyId });
  }

  render() {
    return (
      <StoryReader/>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { loadStory })(App)
