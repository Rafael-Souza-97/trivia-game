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
    const { name } = ranking[0];
    const { scoreFromRedux } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">Olá, {name}!</p>
        <p data-testid="header-score">Sua pontuação: {scoreFromRedux}</p>
        {/* <img data-testid="header-profile-picture" src={ picture } alt={ name } /> */}
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
