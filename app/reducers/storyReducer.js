import ActionType from '../constants/ActionTypes';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const clicksSelector = state => state.get('clicks');
export const counterSelector = state => state.get('counter');
export const dialogueSelector = state => {
  return state.get('dialogue');
};
export const loadingSelector = state => state.get('loading');
export const participantsSelector = state => state.get('participants');
export const storyMetaSelector = state => state.get('storyMeta');
export const storyNameSelector = state => storyMetaSelector(state).get('storyName');
export const typingParticipantsSelector = state => state.get('typingParticipants').sort();

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
  clicks: Immutable.List([]),
  counter: 0,
  dialogue: Immutable.List([]),
  loading: true,
  participants: Immutable.Map({}),
  storyMeta: Immutable.Map({}),
  typingParticipants: Immutable.Map({}),
});

const AVAILABLE_COLORS = Immutable.List(['red', 'blue', 'green', 'purple', 'orange', 'grey',]);

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.BLOCK_FOR_TYPING: {
      return state.setIn(
        ['typingParticipants', action.speaker], action.index
      );
    }

    case ActionType.CLICK_NEXT_BUTTON: {
      if (dialogueSelector(state).size <= counterSelector(state)) {
        return state.update('clicks', clicks => clicks.push(
          {
            lastIndex: state.get('counter')-1,
            time: Date.now(),
            source: action.source,
          }
        ));
      }
      const nextMessage = dialogueSelector(state).get(counterSelector(state));
      if (typingParticipantsSelector(state).has(nextMessage.get('speaker'))) {
        return state.update('clicks', clicks => clicks.push(
          {
            lastIndex: state.get('counter')-1,
            time: Date.now(),
            source: action.source,
          }
        ));
      }
      return state.update('counter', counter => counter+1)
        .update('clicks', clicks => clicks.push(
          {
            lastIndex: state.get('counter'),
            time: Date.now(),
            source: action.source,
          }
        ));
    }

    case ActionType.LOAD_STORY: {
      return state.set('loading', true);
    }

    case ActionType.LOAD_STORY_SUCCESS: {
      const dialogue = action.story.get('dialogue').map((message, index) => message.get('type')? message : message.set('type', 'MESSAGE'));
      const participants = action.story
        .get('participants')
        .reduce(
          (map, obj, i) => {
            const participant = (AVAILABLE_COLORS.indexOf(obj.get('color')) == -1 ? obj.set('color', AVAILABLE_COLORS.get(i % AVAILABLE_COLORS.size)) : obj)
            return map.set(obj.get('name'), participant); 
          }, 
          Immutable.Map({})
        );
      return state.set('clicks', Immutable.List([]))
        .set('counter', 0)
        .set('dialogue', dialogue)
        .set('participants', participants)
        .set('storyMeta', action.story.get('storyMeta'))
        .set('loading', false);
    }

    case ActionType.STOP_TYPING: {
      return state.update('typingParticipants', typingParticipants => {
        if (typingParticipants.get(action.speaker) === action.index) {
          return typingParticipants.delete(action.speaker);
        } else {
          return typingParticipants;
        }
      })
    }

    default:
      return state;
  }
}
