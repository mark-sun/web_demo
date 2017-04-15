import classNames from 'classnames';
import React from 'react';
import Message from './Message';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './Dialogue.scss';

export default function Dialogue({
  className,
  messages,
}) {
  return (
    <div>
      <div>
        {
          messages && messages.map(message => {
            return (
              <Message
                className={classNames(className)}
                name={message.get('speaker')}
                nameColor={'red'}
                text={message.get('text')}
              />
            );
          })
        }
      </div>
    </div>
  );
}

Dialogue.propTypes = {
  messages: ImmutablePropTypes.list,
};
