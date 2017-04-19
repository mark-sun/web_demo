import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { List } from 'immutable';

import styles from './Message.scss';

export default function Message({
  className,
  key,
  name,
  nameColor,
  text,
}) {
  // console.log('^^^^^^^^^^^^^', key, name, nameColor, text);
  return (
    <div
      className={classNames(className, styles.messageBox)}
    >
      { name && (
        <text
          className={styles.name}
          style={{'color': nameColor}}
        >
          {name}
        </text>) }
      <div
        className={styles.messagesList}
      >
        {
          text.map(msg => {
            return (
              <div>
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
  key: PropTypes.number,
  name: PropTypes.string,
  nameColor: PropTypes.string.isRequired,
  text: PropTypes.instanceOf(List).isRequired,
};
