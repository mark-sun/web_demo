import classNames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';
import { createStructuredSelector } from 'reselect';
import Message from './Message';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { participantsSelector } from '../reducers/storyReducer';
import { renderNext } from '../actions/storyActions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Scroll from 'react-scroll';

import styles from './Dialogue.scss';

class Dialogue extends React.Component {

  scrollToBottom = () => {
    Scroll.animateScroll.scrollToBottom();
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {

    let { messages, className, participants } = this.props;

    // console.log('************Dialogue', messages);
    // console.log('************Dialogue participants=', participants && participants.toJS());

    const messagesToLoad = messages && messages.map((message, index) => {
        return (
          <Message
            key={index}
            name={message.get('speaker')}
            nameColor={participants.get(message.get('speaker')).get('color')}
            text={message.get('text')}
          />
        );
      });

    return (
      <div
        className={classNames(className, styles.dialogue)}
        onClick={() => this.props.renderNext()}
      >
        <ReactCSSTransitionGroup
          transitionName="loadMessage"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {messagesToLoad}
        </ReactCSSTransitionGroup>
        <div
          ref={(elem) => { this.placeholder = elem; }}
          className={styles.placeholder}
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
