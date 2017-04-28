import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MobileDetect from 'mobile-detect';
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as ReactDOM from 'react/lib/ReactDOM';
import Scroll from 'react-scroll';

import AsideMessage from './AsideMessage';
import { counterSelector, participantsSelector, storyMetaSelector, typingParticipantsSelector } from '../reducers/storyReducer';
import Message from './Message';
import { renderNext, blockForTyping } from '../actions/storyActions';
import TypingMessage from './TypingMessage';

import styles from './Dialogue.scss';

class Dialogue extends React.Component {

  static useAnimation() {
    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    if (window) {
      return !(mobileDetect.os() === 'iOS');
    }
    return true;
  }

  static getMessagesToLoad(messagesToLoad) {
    if (Dialogue.useAnimation()) {
      return (<ReactCSSTransitionGroup
        transitionName="loadMessage"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {messagesToLoad}
      </ReactCSSTransitionGroup>);
    } else {
      return messagesToLoad;
    }
  }

  scrollToBottom = () => {
    if (Dialogue.useAnimation()) {
      Scroll.animateScroll.scrollToBottom();
    } else {
      // window.scrollTo(0, document.body.scrollHeight);
      const node = ReactDOM.findDOMNode(this.placeholder);
      node.scrollIntoView({behavior: "smooth"});
    }
  };

  componentDidMount() {
    let { blockForTyping, counter, messages } = this.props;
    if (messages.last() && messages.last().get('type') === 'TYPING') {
      const message = messages.last();
      blockForTyping({ index: messages.size-1, speaker: message.get('speaker'), time: message.get('time') })
    }

    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    let { blockForTyping, counter, messages } = this.props;
    if (prevProps.counter != counter && messages.last().get('type') === 'TYPING') {
      const message = messages.last();
      blockForTyping({ index: messages.size-1, speaker: message.get('speaker'), time: message.get('time') })
    }

    this.scrollToBottom();
  }

  render() {

    let { 
      blockForTyping, 
      counter, 
      className, 
      messages, 
      participants, 
      renderNext, 
      storyMeta,
      typingPaticipants, 
    } = this.props;

    // console.log('************Dialogue', messages && messages.toJS());
    // console.log('************Dialogue participants=', participants && participants.toJS());

    const messagesToLoad = messages && Dialogue.getMessagesToLoad(messages.map((message, index) => {
      if (!message.get('type') || message.get('type') === 'MESSAGE') {
        return (
          <Message
            key={index}
            name={message.get('speaker')}
            nameColor={participants.get(message.get('speaker')).get('color')}
            text={message.get('text')}
          />
        );
      } else if (message.get('type') === 'ASIDE') {
        return (
          <AsideMessage
            key={index}
            text={message.get('text')}
          />
        );
      } else if (message.get('type') === 'TYPING') {
        if (typingPaticipants.get(message.get('speaker')) === index) {
          return <TypingMessage 
            key={index}
            name={message.get('speaker')}
            nameColor={participants.get(message.get('speaker')).get('color')}
          />
        }
        
        return (<noscript key={index} />);
      }
    }));

    const hintSection = counter === 0 ?
      (
        <div className={classNames(styles.initialDisplay)}>
          <text className={classNames(styles.description)}>
            {storyMeta && storyMeta.get('introduction')}
          </text>
          <br/>
          <text className={classNames(styles.author)}>
            {storyMeta && '——' + storyMeta.get('author')}
          </text>
          <br/>
          <text className={classNames(styles.hint)}>（点击屏幕，继续故事）</text>
        </div>
      ) : null;
    
    /*const typingSection = (typingPaticipants.keySeq().toArray().map((tp, index) => {
      return <TypingMessage 
        key={index}
        name={tp}
        nameColor={participants.get(tp).get('color')}
      />
    }));*/

    return (
      <div
        className={classNames(className, styles.dialogue)}
        onClick={() => renderNext()}
      >
        {hintSection}
        {messagesToLoad}
        {/*{typingSection}*/}
        <div
          ref={(elem) => { this.placeholder = elem; }}
          className={styles.placeholder}
        />
      </div>
    );
  }
}

Dialogue.propTypes = {
  blockForTyping: PropTypes.func,
  counter: PropTypes.number,
  messages: ImmutablePropTypes.list,
  participants: ImmutablePropTypes.map,
  renderNext: PropTypes.func,
  storyMeta: ImmutablePropTypes.map,
  typingPaticipants: ImmutablePropTypes.map,
};

const selector = createStructuredSelector({
  counter: counterSelector,
  participants: participantsSelector,
  storyMeta: storyMetaSelector,
  typingPaticipants: typingParticipantsSelector,
});

export default connect(selector, {
  blockForTyping,
  renderNext
})(Dialogue);
