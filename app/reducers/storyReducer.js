import ActionType from '../constants/ActionTypes';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const counterSelector = state => state.get('counter');
export const dialogueSelector = state => {
  return state.get('dialogue');
};
export const loadingSelector = state => state.get('loading');
export const participantsSelector = state => state.get('participants');
export const storyMetaSelector = state => state.get('storyMeta');
export const storyNameSelector = state => storyMetaSelector(state).get('storyName');

export const renderedSelector = createSelector(
  dialogueSelector,
  counterSelector,
  (dialogue, position) => {
    if (dialogue) {
      return dialogue.slice(0, position);
    } else {
      return dialogue;
    }
  }
);

const defaultState = Immutable.Map({
  counter: 0,
  dialogue: Immutable.List([]),
  loading: false,
  participants: Immutable.Map({}),
  storyMeta: Immutable.Map({}),
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    case ActionType.CLICK_NEXT_BUTTON: {
      return state.update(
        'counter',
        counter => {
          return counter >= state.get('dialogue').count() ? counter : counter+1;
        });
    }

    case ActionType.LOAD_STORY: {
      return state.set('loading', true);
    }

    case ActionType.LOAD_STORY_SUCCESS: {
      const dialogue = action.story.get('dialogue');
      const participants = action.story
        .get('participants')
        .reduce((map, obj) => { return map.set(obj.get('name'), obj); }, Immutable.Map({}));
      return state.set('counter', 0)
        .set('dialogue', dialogue)
        .set('participants', participants)
        .set('storyMeta', action.story.get('storyMeta'))
        .set('loading', false);
    }

    default:
      return state;
  }
}
