import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { loadStory } from '../actions/storyActions';
import React from 'react';
import Dialogue from '../components/Dialogue';
import { dialogueSelector } from '../reducers/storyReducer';
import { createStructuredSelector } from 'reselect';

class StoryReader extends React.Component {
  componentDidMount() {
    console.log('StoryReader.componentDidMount');
    this.props.loadStory({ storyId: 'story_1' });
  }
  render() {
    const dialogue = this.props;
    return (
      <div>
        <Helmet
          title={ 'story_1 title' }
        />
        <Dialogue
          messages={ dialogue }
        />
      </div>
    );
  }
}

const selector = createStructuredSelector({
  dialogue: dialogueSelector,
});

export default connect(selector, { loadStory })(StoryReader);
