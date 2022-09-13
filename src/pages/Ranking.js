import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../componets/PlayerCard';
import { getFromLocalStorage } from '../services/storage';

export default class Ranking extends Component {
  state = {
    ranking: getFromLocalStorage('ranking'),
  };

  render() {
    const { ranking } = this.state;

    console.log(ranking);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Home
        </button>
        {ranking.length > 0 && ranking
          .sort((a, b) => b.score - a.score).map((player, i) => (
            <PlayerCard key={ i } player={ player } index={ i } />
          ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
