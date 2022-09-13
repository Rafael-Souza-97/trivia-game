export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_NUMBER_OF_HITS = 'UPDATE_NUMBER_OF_HITS';

export const updateScore = (score) => ({ type: UPDATE_SCORE, score });
export const updateNumberOfHits = (numberOfHits) => ({
  type: UPDATE_NUMBER_OF_HITS, numberOfHits,
});
