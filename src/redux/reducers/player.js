import { UPDATE_NUMBER_OF_HITS, UPDATE_SCORE } from '../actions';

const initalState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  numberOfHits: 0,
  indexOfResults: 0,
};

function player(state = initalState, action) {
  switch (action.type) {
  case UPDATE_SCORE: return {
    ...state, score: state.score + action.score,
  };
  case UPDATE_NUMBER_OF_HITS: return {
    ...state, numberOfHits: action.numberOfHits,
  };
  default:
    return state;
  }
}

export default player;
