import { RESET_SCORE, UPDATE_NUMBER_OF_HITS, UPDATE_SCORE } from '../actions';

const initalState = {
  name: '',
  score: 0,
  gravatarEmail: '',
  assertions: 0,
  indexOfResults: 0,
};

function player(state = initalState, action) {
  switch (action.type) {
  case UPDATE_SCORE: return {
    ...state, score: state.score + action.score,
  };
  case RESET_SCORE: return {
    ...state, score: action.newScore,
  };
  case UPDATE_NUMBER_OF_HITS: return {
    ...state, assertions: action.numberOfHits,
  };
  default:
    return state;
  }
}

export default player;
