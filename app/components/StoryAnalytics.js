import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CopyToClipboard from 'react-copy-to-clipboard';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link, Route } from 'react-router-dom';
import moment from '../utils/moment-timezone';
import React from 'react';
import StoryReader from './StoryReader';

import { clicksSelector, storyMetaSelector } from '../reducers/storyReducer';
import styles from './StoryAnalytics.scss';


class StoryAnalytics extends React.Component {
  render() {
    let { clicks, storyMeta } = this.props;

    const title = storyMeta.get('title');
    const currentTime = moment().tz('America/Los_Angeles').format('YYYY-MM-DD h:mm:ss a Z');
    const clickStats = clicks.map((click, index) => (index+1+','+click.counter+','+click.time))
                    .reduce((ret, cur, index) => (ret + '\n' + cur), "click#,message#,time");
    const stats = title + ' @' + currentTime + '\n' + clickStats;

    const mailToLink = `mailto:marksun1988@gmail.com?cc=celinedi@gmail.com&subject=${title + ' @' + currentTime}&body=${stats.replace(/\n/g, '%0A')}`;
    return (
      <div className={styles.storyAnalyticsContainer}>
        <textarea
          readOnly="readOnly"
          rows="20"
          className={styles.csvArea}
          value={stats}
        />
        <CopyToClipboard text={stats}
          onCopy={() => this.setState({copied: true})}>
          <button className={styles.copyButton} >Copy to clipboard</button>
        </CopyToClipboard>
        <button
          className={styles.copyButton}
          onClick={() => {
            window.location.href=mailToLink;
          }}
        >
          Email the result
        </button>
      </div>
    );
  }
}

StoryAnalytics.propTypes = {
  clicks: ImmutablePropTypes.list,
  storyMeta: ImmutablePropTypes.map,
};

const selector = createStructuredSelector({
  clicks: clicksSelector,
  storyMeta: storyMetaSelector,
});

export default connect(selector, {})(StoryAnalytics);
