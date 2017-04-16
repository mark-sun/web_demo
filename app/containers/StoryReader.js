import { connect } from 'react-redux';
import { loadStory } from '../actions/storyActions';
import React from 'react';
import Dialogue from '../components/Dialogue';
import { renderedSelector } from '../reducers/storyReducer';
import { createStructuredSelector } from 'reselect';

class StoryReader extends React.Component {

  componentDidMount() {
    console.log('************StoryReader.componentDidMount');
    this.props.loadStory({ storyId: 'story_1' });
  }

  render() {
    console.log('************StoryReader', this.props);
    console.log('************StoryReader storyId', this.props.storyId);
    return (
        <Dialogue
          messages={ this.props.dialogue }
        />
    );
  }
}

const selector = createStructuredSelector({
  dialogue: renderedSelector,
});

export default connect(selector, { loadStory })(StoryReader);
