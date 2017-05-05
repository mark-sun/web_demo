import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialogue from '../components/Dialogue';
import { loadingSelector } from '../reducers/storyReducer';
import { loadStory } from '../actions/storyActions';
import React from 'react';
import Spinner from '../components/Spinner';

import styles from './StoryReader.scss';

class StoryReader extends React.Component {

  componentWillMount() {
    // console.log("************************* componentWillMount", this.props.storyId);
    this.props.loadStory({ storyId: this.props.storyId });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.storyId !== nextProps.storyId;
  }

  componentWillUpdate(nextProps) {
    // console.log("************************* componentWillUpdate", this.props.storyId, nextProps);
    this.props.loadStory({ storyId: nextProps.storyId });
  }

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
        />
      </div>
    );
  }
}

const selector = createStructuredSelector({
  loading: loadingSelector,
  storyId: (state, props) => props.match.params.storyId
});

export default connect(selector, { loadStory })(StoryReader);
