import { UPDATE_SCORE } from '../actions';

const initalState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = initalState, action) {
  switch (action.type) {
  case UPDATE_SCORE: return {
    ...state, score: state.score + action.score,
  };
  default:
    return state;
  }
}

export default player;
