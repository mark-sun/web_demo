import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'immutable';

import styles from './TimeIndicator.scss';

export default function TimeIndicator({
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
          text.map((msg, idx) => {
            return (
              <div key={idx}>
                <div
                  className={styles.messageText}
                >
                  { msg }
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

TimeIndicator.propTypes = {
  className: PropTypes.string,
  text: PropTypes.instanceOf(List).isRequired,
};
