import { connect } from 'react-redux';
import { loadStory } from '../actions/storyActions';
import React from 'react';
import Dialogue from '../components/Dialogue';
import { renderedSelector } from '../reducers/storyReducer';
import { createStructuredSelector } from 'reselect';

import styles from './StoryReader.scss';

class StoryReader extends React.Component {

  render() {
    // console.log('************StoryReader', this.props);
    // console.log('************StoryReader storyId', this.props.storyId);
    return (
      <div
        className={styles.storyReaderContainer}
      >
        <Dialogue
          className={styles.dialogue}
          messages={ this.props.dialogue }
        />
      </div>
    );
  }
}

const selector = createStructuredSelector({
  dialogue: renderedSelector,
});

export default connect(selector, { loadStory })(StoryReader);
