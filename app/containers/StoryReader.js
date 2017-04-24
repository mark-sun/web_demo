import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialogue from '../components/Dialogue';
import { loadStory } from '../actions/storyActions';
import React from 'react';
import { renderedSelector } from '../reducers/storyReducer';
import queryString from 'query-string';

import styles from './StoryReader.scss';

class StoryReader extends React.Component {

  componentDidMount() {
    console.log('************StoryReader.componentDidMount');
    console.log('location=', this.props.location);
    const parsed = queryString.parse(this.props.location.search);
    console.log('param=', parsed);
    this.props.loadStory({ storyId: 'story_sisi' });
  }

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
