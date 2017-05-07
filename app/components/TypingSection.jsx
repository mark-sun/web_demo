import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { PropTypes } from 'react';
import { List } from 'immutable';
import styles from './TypingSection.scss';

import { blockForTyping } from '../actions/storyActions';
import { participantsSelector, typingParticipantsSelector } from '../reducers/storyReducer';

function TypingSection({
  participants,
  typingPaticipants,
}) {
  // console.log('^^^^^^^^^^^^^', typingPaticipants, typingPaticipants.size);
  if (!typingPaticipants || typingPaticipants.size == 0) {
    return <noscript />;
  }
  return (
    <div
      className={styles.typingBox}
    >
      {
        typingPaticipants.keySeq().toArray().map((tpName, index) => {
          return (<div key={index} className={styles.names}>
            { index != 0 && <text style={{'paddingRight': 0.5+'vw' }}>,</text> }
            <text className={classNames(
              styles.name, 
              styles[`name--${participants.get(tpName).get('color')}`]
            )}>
              { tpName }
            </text>
          </div>);
        })
      }
      <div className={styles.typing}>正在输入</div>
    </div>
  );
}

TypingSection.propTypes = {
  participants: ImmutablePropTypes.map,
  typingPaticipants: ImmutablePropTypes.map,
};

const selector = createStructuredSelector({
  participants: participantsSelector,
  typingPaticipants: typingParticipantsSelector,
});

export default connect(selector, { blockForTyping })(TypingSection);

