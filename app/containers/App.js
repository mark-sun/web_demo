import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadStory } from '../actions/storyActions';
import queryString from 'query-string';
import StoryReader from './StoryReader';

class App extends Component {

  componentWillMount() {
    this.props.loadStory({ storyId: this.props.storyId });
  }

  shouldComponentUpdate(nextProps) {
    const nextParsed = queryString.parse(nextProps.location.search);
    return this.props.storyId !== nextParsed.storyId;
  }

  componentWillUpdate(nextProps) {
    const parsed = queryString.parse(nextProps.location.search);
    this.props.loadStory({ storyId: parsed.storyId });
  }

  render() {
    return (
      <StoryReader/>
    )
  }
}

function mapStateToProps(state, props) {
  const parsed = queryString.parse(props.location.search);
  return {
    storyId: parsed && parsed.storyId,
  }
}

export default connect(mapStateToProps, { loadStory })(App)
