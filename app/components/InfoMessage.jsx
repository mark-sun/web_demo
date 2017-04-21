import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { List } from 'immutable';

import styles from './InfoMessage.scss';

export default function InfoMessage({
  className,
  text,
}) {

  return (
    <div
      className={classNames(className, styles.messageBox)}
    >
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

InfoMessage.propTypes = {
  className: PropTypes.string,
  text: PropTypes.instanceOf(List).isRequired,
};
