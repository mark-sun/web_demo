import ActionTypes from '../constants/ActionTypes';
import Promise from 'bluebird';
import StoryWebUtil from '../utils/StoryWebUtil';

export function renderNext() {
  return {
    type: ActionTypes.CLICK_NEXT_BUTTON,
  };
}

export function loadStory({ storyId }) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOAD_STORY,
    });
    Promise.resolve(
      StoryWebUtil.getStoryJson({storyId})
    ).then(story => {
      dispatch({
        type: ActionTypes.LOAD_STORY_SUCCESS,
        story,
      })
    });
  };
}
