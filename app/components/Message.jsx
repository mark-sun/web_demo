import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import emoji from './Emoji';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { loadingSelector, participantsSelector } from '../reducers/storyReducer';
import WebUtil from '../utils/WebUtil';
import styles from './Message.scss';

function Message({
  loading,
  message,
  participants,
}) {
  if (loading) {
    return ( <noscript/> );
  }
  // console.log('^^^^^^^^^^^^^', message.toJS());
  const participant = participants.get(message.get('speaker'));
  // console.log('^^^^^^^^^^^^^', participant.toJS());
  return (
    <div
      className={classNames( 
        styles.messageBox,
        styles[`messageBox--${participant.get('color')}`],
      )}
    >
    <div
      className={classNames(
        styles.name,
        styles[`name--${participant.get('color')}`],
      )}
    >
      {message.get('speaker')}
    </div>
      <div
        className={styles.messagesList}
      >
        {
          message.get('text') && message.get('text').map((msg, idx) => {
            return (
              <div 
                className={styles.messageText}
                key={idx} 
              >
                {emoji.replace_colons(msg)}}
              </div>
            );
          })
        }
        {
          message.get('image') && 
          <div className={styles.imageBox}>
            <img 
              className={styles.image}
              src={WebUtil.getImageUrl(message.get('image'))}
            />
          </div>
        }
      </div>
    </div>
  );
}

Message.propTypes = {
  loading: PropTypes.bool,
  participants: ImmutablePropTypes.map,
};

const selector = createStructuredSelector({
  loading: loadingSelector,
  participants: participantsSelector,
});

export default connect(selector, {})(Message);
