import Immutable from 'immutable';
import ActionTypes from '../constants/ActionTypes';

export function renderNext() {
  return {
    type: ActionTypes.CLICK_NEXT_BUTTON,
  };
}

export function loadStory({ storyId }) {
  return (dispatch) => {
    const story = Immutable.fromJS(require(`../assets/stories/${storyId}.json`));
    dispatch({
      type: ActionTypes.LOAD_STORY,
      story,
    });
  };
}
