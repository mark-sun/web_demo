import ActionType from '../constants/ActionTypes';
import Immutable from 'immutable';

export const storySelector = state => state.get('story');
export const participantsSelector = state => storySelector(state).get('participants');
export const dialogueSelector = state => {
  return storySelector(state).get('dialogue');
};

export const renderedSelector = state => state.renderedStory;

const defaultState = Immutable.Map({
  loading: false,
  story: Immutable.Map({}),
  renderedStory: Immutable.List([]),
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.LOAD_STORY: {
      return state.set('story', action.story);
    }

    default:
      return state;
  }
}
