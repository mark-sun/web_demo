import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'immutable';
import { Link, withRouter } from 'react-router-dom';

import { counterSelector, dialogueSelector, } from '../reducers/storyReducer';

function AnalyticsLink({
  counter, 
  dialogue,
  match,
}) {
  // console.log('^^^^^^^^^^^^^', match);
  if (counter < dialogue.size) {
    return <noscript />;
  }
  return (
    <div>
      <Link to={`${match.url}/stat`}> 请进入数据分析 </Link>
    </div>
  );
}

AnalyticsLink.propTypes = {
  counter: PropTypes.number,
  dialogue: ImmutablePropTypes.list,
};

const selector = createStructuredSelector({
  counter: counterSelector,
  dialogue: dialogueSelector,
});

export default withRouter(connect(selector, { })(AnalyticsLink));
