import classNames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import InfoMessage from './InfoMessage';
import Message from './Message';
import { participantsSelector } from '../reducers/storyReducer';
import { renderNext } from '../actions/storyActions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Scroll from 'react-scroll';
import * as ReactDOM from 'react/lib/ReactDOM';
import MobileDetect from 'mobile-detect';

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
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {

    let { messages, className, participants } = this.props;

    // console.log('************Dialogue', messages);
    // console.log('************Dialogue participants=', participants && participants.toJS());

    const messagesToLoad = messages && Dialogue.getMessagesToLoad(messages.map((message, index) => {
      if (participants.get(message.get('speaker')).get('type') === 'info') {
        return (
          <InfoMessage
            text={message.get('text')}
          />
        );
      } else {
        return (
          <Message
            key={index}
            name={message.get('speaker')}
            nameColor={participants.get(message.get('speaker')).get('color')}
            text={message.get('text')}
            type={participants.get(message.get('speaker')).get('type')}
          />
        );
      }
    }));

    return (
      <div
        className={classNames(className, styles.dialogue)}
        onClick={() => this.props.renderNext()}
      >
        {messagesToLoad}
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

const selector = createStructuredSelector({
  participants: participantsSelector,
});

export default connect(selector, {
  renderNext
})(Dialogue);
