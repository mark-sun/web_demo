import ActionTypes from '../constants/ActionTypes';
import Promise from 'bluebird';
import WebUtil from '../utils/WebUtil';

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
      WebUtil.getStoryJson({storyId})
    ).then(story => {
      dispatch({
        type: ActionTypes.LOAD_STORY_SUCCESS,
        story,
      })
    });
  };
}

const SHORTEST_TIMEOUT = 1;
const LONGEST_TIMEOUT = 8;
const DEFAULT_TIMEOUT = 3;

export function blockForTyping({ speaker, time, index }) {
  // console.log('*********blockForTyping', speaker, time, index);
  const timeout = Math.min(Math.max((time || DEFAULT_TIMEOUT), SHORTEST_TIMEOUT), LONGEST_TIMEOUT) * 1000; // in milliseconds
  return (dispatch) => {
    dispatch({
      type: ActionTypes.BLOCK_FOR_TYPING,
      speaker,
      index,
    })
    Promise.resolve( 
      setTimeout(() => {
        dispatch({
          type: ActionTypes.STOP_TYPING,
          speaker,
          index,
        });
        dispatch(renderNext());
      }, timeout)
    )
  };
}
