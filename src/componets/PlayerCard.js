import React, { Component } from 'react';
import { string } from 'prop-types';

export default class PlayerCard extends Component {
  render() {
    const { player: { name, picture, score, index } } = this.props;

    return (
      <div>
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
        <p>{picture}</p>
      </div>
    );
  }
}

PlayerCard.propTypes = {
  name: string,
}.isRequired;
