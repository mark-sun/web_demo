import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadStory } from '../actions/storyActions';
import StoryReader from './StoryReader';

class App extends Component {

  componentDidMount() {
    console.log('************App.componentDidMount');
    this.props.loadStory({ storyId: 'story_1' });
  }

  render() {
    console.log('************App.render');
    return (
      <div>
        <StoryReader />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { loadStory })(App)
