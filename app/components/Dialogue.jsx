import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MobileDetect from 'mobile-detect';
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as ReactDOM from 'react/lib/ReactDOM';
import Scroll from 'react-scroll';
import Spinner from './Spinner';
import Tappable from 'react-tappable';

import AsideMessage from './AsideMessage';
import { counterSelector, loadingSelector, participantsSelector, renderedSelector, storyMetaSelector } from '../reducers/storyReducer';
import Message from './Message';
import { renderNext, blockForTyping } from '../actions/storyActions';
import TimeIndicator from './TimeIndicator';
import TypingSection from './TypingSection';

import styles from './Dialogue.scss';

class Dialogue extends React.Component {
  static useAnimation() {
    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    if (window) {
      return !(mobileDetect.os() === 'iOS');
    }
    return true;
  }

  static getMessagesToLoad(messagesToLoad, placeholder) {
    if (Dialogue.useAnimation()) {
      return (<ReactCSSTransitionGroup
        className={styles.messages}
        transitionName="loadMessage"
        transitionAppear={true}
        transitionAppearTimeout={100}
        transitionEnterTimeout={100}
        transitionLeaveTimeout={100}
      >
        {placeholder}
        {messagesToLoad}
      </ReactCSSTransitionGroup>);
    } else {
      return (<div className={styles.messages}>{placeholder} {messagesToLoad} </div>);
    }
  }

  scrollToBottom = () => {
    // console.log('************* STILL SCROLLING');
    if (Dialogue.useAnimation()) {
      Scroll.animateScroll.scrollToBottom();
    } else {
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
    if (prevProps.counter != counter && messages.last() && messages.last().get('type') === 'TYPING') {
      const message = messages.last();
      blockForTyping({ index: messages.size-1, speaker: message.get('speaker'), time: message.get('time') })
    }

    this.scrollToBottom();
  }

  render() {
    const {
      counter, 
      className,
      loading, 
      messages,
      participants, 
      renderNext, 
      storyMeta,
    } = this.props;

    if (loading) {
      return (
        <div className={styles.loading}>
          <Spinner size='large'/>
        </div>
      )
    }

    // console.log('************Dialogue', messages && messages.toJS());
    // console.log('************Dialogue participants=', participants && participants.toJS());
    const placeholder = (<div
          ref={(elem) => { this.placeholder = elem; }}
          className={styles.placeholder}
        >
          <TypingSection />
    </div>);

    const messagesToLoad = messages && Dialogue.getMessagesToLoad(messages.map((message, index) => {
      if (!message.get('type') || message.get('type') === 'MESSAGE') {
        return (
          <Message
            key={index}
            message={message}
          />
        );
      } else if (message.get('type') === 'ASIDE') {
        return (
          <AsideMessage
            key={index}
            text={message.get('text')}
          />
        );
      } else if (message.get('type') === 'TIME') {
        return (
          <TimeIndicator
            key={index}
            text={message.get('text')}
          />
        );
      } else if (message.get('type') === 'TYPING') {
        return (<noscript key={index} />);
      }
    }).reverse() /* REVERSE it because of column-reverse */
    , placeholder);

    const hintSection = (counter == 0) &&
      (
        <div className={classNames(styles.initialDisplay)}>
          {
            storyMeta && <div className={classNames(styles.title)}>
              { '「 ' + storyMeta.get('title') + ' 」' }
            </div>
          }
          <br/>
          {
            storyMeta && <div className={classNames(styles.author)}>
              { '——' + storyMeta.get('author') }
            </div>
          }
          <br/>
          <br/>
          {
            storyMeta && <div className={classNames(styles.introduction)}>
              { storyMeta.get('introduction') }
            </div>
          }
          <br/>
          <div className={classNames(styles.hint)}>（点击屏幕，继续故事）</div>
        </div>
      );

    return (
      <Tappable
        onTap={() => renderNext()}
        className={classNames(className, styles.dialogue)}
      >
        {hintSection}
        {messagesToLoad}
      </Tappable>
    );
  }
}

Dialogue.propTypes = {
  blockForTyping: PropTypes.func,
  counter: PropTypes.number,
  loading: PropTypes.bool,
  messages: ImmutablePropTypes.list,
  participants: ImmutablePropTypes.map,
  renderNext: PropTypes.func,
  storyMeta: ImmutablePropTypes.map,
};

const selector = createStructuredSelector({
  counter: counterSelector,
  loading: loadingSelector,
  messages: renderedSelector,
  participants: participantsSelector,
  storyMeta: storyMetaSelector,
});

export default connect(selector, {
  blockForTyping,
  renderNext
})(Dialogue);
