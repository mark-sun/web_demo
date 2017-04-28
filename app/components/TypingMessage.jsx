import { blockForTyping } from '../actions/storyActions';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { List } from 'immutable';
import styles from './Message.scss';

function TypingMessage({
  className,
  name,
  nameColor,
  ...props,
}) {
  console.log('^^^^^^^^^^^^^', name, nameColor);
  return (
    <div
      className={classNames(className, styles.messageBox)}
    >
      {
        <text
          className={styles.name}
          style={{ 'color': nameColor }}
        >
          {name}
        </text>
      }
      <div
        className={styles.messagesList}
      >
        <text
          className={styles.messageText}
        >
          正在输入...
        </text>
      </div>
    </div>
  );
}

TypingMessage.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  nameColor: PropTypes.string.isRequired,
};

export default connect(null, { blockForTyping })(TypingMessage);

