import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialogue from '../components/Dialogue';
import React from 'react';
import { loadingSelector, renderedSelector } from '../reducers/storyReducer';
import Spinner from '../components/Spinner';

import styles from './StoryReader.scss';

class StoryReader extends React.Component {

  render() {
    let { loading, dialogue } = this.props;

    if (loading) {
      return (
        <div className={styles.loading}>
          <Spinner size='large'/>
        </div>
      )
    }

    return (
      <div
        className={styles.storyReaderContainer}
      >
        <Dialogue
          className={styles.dialogue}
          messages={ dialogue }
        />
      </div>
    );
  }
}

const selector = createStructuredSelector({
  dialogue: renderedSelector,
  loading: loadingSelector,
});

export default connect(selector, { })(StoryReader);
