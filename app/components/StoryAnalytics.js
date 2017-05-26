import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CopyToClipboard from 'react-copy-to-clipboard';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link, Route } from 'react-router-dom';
import moment from '../utils/moment-timezone';
import React from 'react';
import StoryReader from './StoryReader';

import { clicksSelector, dialogueSelector, storyMetaSelector } from '../reducers/storyReducer';
import styles from './StoryAnalytics.scss';


class StoryAnalytics extends React.Component {

  static WORD_REGEX = new RegExp(
    '[A-Za-z0-9_\]+|'+                             // ASCII letters (no accents)
    '[\u3040-\u309F]+|'+                           // Hiragana
    '[\u30A0-\u30FF]+|'+                           // Katakana
    '[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF]',   // Single CJK ideographs
    'g'   // global
  );

  getEmailLink(title, currentTime, body) {
    return `mailto:marksun1988@gmail.com?cc=celinedi@gmail.com&subject=ClickingAnalytics: ${title + ' @' + currentTime}&body=${body.replace(/\n/g, '%0A')}`;
  }

  countWord(message) {
    let wordCount = 0;
    if (message.get('text')) {
      message.get('text').map((msg, index) => {
        let splits = msg.match(StoryAnalytics.WORD_REGEX);
        splits && splits.length && (wordCount+=splits.length);
      })
    }
    return wordCount;
  }

  buildTableHeader() {
    return "click#,message#,messageType,workCount,clickSource,time";
  }

  buildClickInfo(index, click, message) {
    return (index+1) + ',' 
      + click.lastIndex + ','
      + message.get('type') + ','
      + this.countWord(message) + ','
      + click.source + ','
      + click.time;
  }

  getClickStats() {
    let { clicks, dialogue, } = this.props;

    return clicks.map(
      (click, index) => this.buildClickInfo(index, click, dialogue.get(click.lastIndex))
    ).reduce(
      (ret, cur, index) => (ret + '\n' + cur),
      this.buildTableHeader()
    );
  }

  render() {
    let { storyMeta } = this.props;

    const title = storyMeta.get('title');
    const currentTime = moment().tz('America/Los_Angeles').format('YYYY-MM-DD h:mm:ss a Z');
    const clickStats = this.getClickStats();
    const analyticsContent = title + ' @' + currentTime + '\n' + clickStats;

    const mailToLink = this.getEmailLink(title, currentTime, analyticsContent);
    return (
      <div className={styles.storyAnalyticsContainer}>
        <textarea
          readOnly="readOnly"
          rows="20"
          className={styles.csvArea}
          value={analyticsContent}
        />
        <CopyToClipboard text={analyticsContent}
          onCopy={() => this.setState({copied: true})}>
          <button className={styles.copyButton}>复制</button>
        </CopyToClipboard>
        <button
          className={styles.copyButton}
          onClick={() => {
            window.location.href=mailToLink;
          }}
        >
          Email结果
        </button>
      </div>
    );
  }
}

StoryAnalytics.propTypes = {
  clicks: ImmutablePropTypes.list,
  dialogue: ImmutablePropTypes.list,
  storyMeta: ImmutablePropTypes.map,
};

const selector = createStructuredSelector({
  clicks: clicksSelector,
  dialogue: dialogueSelector,
  storyMeta: storyMetaSelector,
});

export default connect(selector, {})(StoryAnalytics);
