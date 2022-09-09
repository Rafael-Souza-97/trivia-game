import React, { Component } from 'react';
import { getFromLocalStorage } from '../services/storage';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      ranking: getFromLocalStorage('ranking'),
    };
  }

  render() {
    const { ranking } = this.state;
    const { name, score, picture } = ranking[0];

    return (
      <div>
        <h1>Header</h1>
        <p data-testid="header-player-name">{`Nome: ${name}`}</p>
        <p data-testid="header-score">{`Placar: ${score}`}</p>
        <img data-testid="header-profile-picture" src={ picture } alt={ name } />
      </div>
    );
  }
}
