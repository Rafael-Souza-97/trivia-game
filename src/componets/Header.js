import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFromLocalStorage } from '../services/storage';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      ranking: getFromLocalStorage('ranking'),
    };
  }

  render() {
    const { ranking } = this.state;
    const { name, score, picture } = ranking[0];
    const { scoreFromRedux } = this.props;
    return (
      <div>
        <h1>Header</h1>
        <p data-testid="header-player-name">{`Nome: ${name}`}</p>
        <p data-testid="header-score">{`Placar: ${score + scoreFromRedux}`}</p>
        <img data-testid="header-profile-picture" src={ picture } alt={ name } />
      </div>
    );
  }
}

const mapStateToProps = () => (state) => ({
  scoreFromRedux: state.player.score,
});

Header.propTypes = {
  scoreFromRedux: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
