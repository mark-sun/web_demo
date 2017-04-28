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
export const typingParticipantsSelector = state => state.get('typingParticipants');

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
  typingParticipants: Immutable.Map(),
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.BLOCK_FOR_TYPING: {
      // console.log('participants', state.get('participants').toJS());
      // console.log('typingParticipants', state.get('typingParticipants').toJS());
      // console.log('action.speaker', action.speaker);
      // console.log('&&&&&^^^^^^^^^^^^typingParticipants', state.get('typingParticipants').get(action.speaker) && state.get('typingParticipants').get(action.speaker).toJS());
      // console.log('&&&&&&&&&&&&&&&&participants', state.get('participants').get(action.speaker));
      return state.setIn(
        ['typingParticipants', [action.speaker]], action.index
      );
    }

    case ActionType.CLICK_NEXT_BUTTON: {
      if (dialogueSelector(state).size <= counterSelector(state)) {
        return state;
      }
      const nextMessage = dialogueSelector(state).get(counterSelector(state)+1);
      if (typingParticipantsSelector(state).has(nextMessage.get('speaker'))) {
        return state;
      }
      return state.update('counter', counter => counter+1);
    }

    case ActionType.LOAD_STORY: {
      return state.set('loading', true);
    }

    case ActionType.LOAD_STORY_SUCCESS: {
      const dialogue = action.story.get('dialogue');
      const participants = action.story
        .get('participants')
        .reduce((map, obj) => { return map.set(obj.get('name'), obj); }, Immutable.Map({}));
      return state.set('counter', 1)
        .set('dialogue', dialogue)
        .set('participants', participants)
        .set('storyMeta', action.story.get('storyMeta'))
        .set('loading', false);
    }

    case ActionType.STOP_TYPING: {
      return state.setIn(['typingParticipants', action.speaker], null);


      // const newState = state.update(
      //   'typingParticipants',
      //   typingParticipants => {
      //     console.log('action.speaker', action.speaker);
      //     console.log('typingParticipants', typingParticipants.toJS());
      //     console.log('typingParticipants.get(action.speaker)', typingParticipants.has(action.speaker));
      //     if (typingParticipants.get(action.speaker) == action.index) {
      //       return typingParticipants.delete(action.speaker);
      //     } else {
      //       return typingParticipants;
      //     }
      //   }
      // );
      // console.log('********newState=', newState.toJS());
      return newState;
    }

    default:
      return state;
  }
}
