import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { List } from 'immutable';

import styles from './Message.scss';

export default function Message({
  className,
  name,
  nameColor,
  text,
}) {
  console.log('^^^^^^^^^^^^^', name, nameColor, text.toJS());
  return (
    <div
      className={classNames(className, styles.messageBox)}
    >
      {
        name && (
        <text
          className={styles.name}
          style={{'color': nameColor}}
        >
          {name}
        </text>)
      }
      <div
        className={styles.messagesList}
      >
        {
          text.map((msg, idx) => {
            return (
              <div key={idx}>
                <text
                  className={styles.messageText}
                >
                  { msg }
                </text>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

Message.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  nameColor: PropTypes.string.isRequired,
  text: PropTypes.instanceOf(List).isRequired,
};
