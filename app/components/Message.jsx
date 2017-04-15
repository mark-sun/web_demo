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
  return (
    <div className={classNames(className)}>
      { name && (<text>{name}</text>) }
      <div>
        {
          text.map(msg => {
            return (
              <text>
                { msg }
              </text>
            );
          })
        }
      </div>
    </div>
  );
}

Message.propTypes = {
  name: PropTypes.string,
  nameColor: PropTypes.string.isRequired,
  text: PropTypes.instanceOf(List).isRequired,
};
