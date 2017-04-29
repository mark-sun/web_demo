import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import React, { PropTypes } from 'react';

import { participantsSelector } from '../reducers/storyReducer';
import StoryWebUtil from '../utils/StoryWebUtil';
import styles from './Message.scss';

function Message({
  className,
  message,
  participants,
}) {
  // console.log('^^^^^^^^^^^^^', message.toJS());
  return (
    <div
      className={classNames(className, styles.messageBox)}
    >
      {
        (<text
          className={styles.name}
          style={{'color': participants.get(message.get('speaker')).get('color')}}
        >
          {message.get('speaker')}
        </text>)
      }
      <div
        className={styles.messagesList}
      >
        {
          message.get('text') && message.get('text').map((msg, idx) => {
            return (
              <div key={idx}>
                <text className={styles.messageText}>
                  { msg }
                </text>
              </div>
            );
          })
        }
        {
          message.get('image') && 
          <div className={styles.imageBox}>
            <img 
              className={styles.image}
              src={StoryWebUtil.getImageUrl(message.get('image'))}
            />
          </div>
        }
      </div>
    </div>
  );
}

Message.propTypes = {
  className: PropTypes.string,
  participants: ImmutablePropTypes.map,
};

const selector = createStructuredSelector({
  participants: participantsSelector,
});

export default connect(selector, {})(Message);
