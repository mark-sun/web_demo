import ActionType from '../constants/ActionTypes';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const participantsSelector = state => state.get('participants');
export const dialogueSelector = state => {
  console.log('************dialogueSelector: state=', state.toJS());
  return state.get('dialogue');
};
const counterSelector = state => state.get('counter');

export const renderedSelector = createSelector(
  dialogueSelector,
  counterSelector,
  (dialogue, position) => {
    if (dialogue) {
      console.log('renderSlector+++++++++++++++++++++++', position, '*******', dialogue.slice(0, position));
      return dialogue.slice(0, position);
    } else {
      return dialogue;
    }
  }
);

const defaultState = Immutable.Map({
  loading: false,
  dialogue: Immutable.List([]),
  participants: Immutable.Map({}),
  counter: 0,
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.LOAD_STORY: {
      const dialogue = action.story.get('dialogue');
      const participants = action.story
        .get('participants')
        .reduce((map, obj) => { return map.set(obj.get('name'), obj); }, Immutable.Map({}));
      return state.set('dialogue', dialogue)
        .set('participants', participants)
        .set('counter', 0);
    }

    case ActionType.CLICK_NEXT_BUTTON: {
      return state.update(
        'counter',
        counter => {
          return counter >= state.get('dialogue').count() ? counter : counter+1;
        });
    }

    default:
      return state;
  }
}
