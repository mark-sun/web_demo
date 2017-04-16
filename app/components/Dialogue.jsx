import classNames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';
import { createStructuredSelector } from 'reselect';
import Message from './Message';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { participantsSelector } from '../reducers/storyReducer';
import { renderNext } from '../actions/storyActions';

import styles from './Dialogue.scss';
import * as ReactDOM from "react/lib/ReactDOM";

class Dialogue extends React.Component {

  scrollToBottom = () => {
    // window.scrollTo(0, document.body.scrollHeight);
    const node = ReactDOM.findDOMNode(this.placeholder);
    node.scrollIntoView({behavior: "smooth"});
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleClick() {
    this.props.renderNext();
  }

  render() {

    let { messages, className, participants } = this.props;

    // console.log('************Dialogue', messages);
    // console.log('************Dialogue participants=', participants && participants.toJS());

    return (
      <div
        className={classNames(className, styles.dialogue)}
        onClick={() => this.handleClick()}
      >
        {/*<div className={classNames(className, styles.messages)}>*/}
          {
            messages && messages.map((message, index) => {
              return (
                <Message
                  className={classNames(className)}
                  key={index}
                  name={message.get('speaker')}
                  nameColor={participants.get(message.get('speaker')).get('color')}
                  text={message.get('text')}
                />
              );
            })
          }
        {/*</div>*/}
        <div
          ref={(elem) => { this.placeholder = elem; }}
          className={classNames(className, styles.placeholder)}
        />
      </div>
    );
  }
}



Dialogue.propTypes = {
  messages: ImmutablePropTypes.list,
  participants: ImmutablePropTypes.Map,
};

const selector = createStructuredSelector(
  {
    participants: participantsSelector,
  }
);


export default connect(selector, {
  renderNext
})(Dialogue);
