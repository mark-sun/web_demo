import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialogue from '../components/Dialogue';
import React from 'react';
import { loadingSelector, renderedSelector } from '../reducers/storyReducer';
// import spinner from '../assets/images/puff.svg';

import styles from './StoryReader.scss';

class StoryReader extends React.Component {

  render() {
    let { loading, dialogue } = this.props;

    if (loading) {
      return (
        <div className={styles.loading}>
          <text>正在加载...</text>
          {/*<img src={spinner} width="40" />*/}
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
