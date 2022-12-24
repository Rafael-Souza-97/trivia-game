import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToLocalStorage, getFromLocalStorage } from '../services/storage';
import '../styles/index.css'

class Feedback extends Component {
  state = {
    feedbackMessage: '',
  };

  componentDidMount() {
    const { numberOfHits } = this.props;
    const minHits = 3;
    if (numberOfHits < minHits) {
      this.setState({ feedbackMessage: 'Could be better...' });
    } else {
      this.setState({ feedbackMessage: 'Well Done!' });
    }
  }

  render() {
    const { feedbackMessage } = this.state;
    const { numberOfHits, score } = this.props;
    return (
      <div className='trivia-container'>
        <p data-testid="feedback-total-score">Pontuação Final: {score}</p>
        <p data-testid="feedback-total-question">Total de Acertos: {numberOfHits}</p>
        <p data-testid="feedback-text">{feedbackMessage}</p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
            const currPlayer = getFromLocalStorage('ranking')[0];
            const newRanking = getFromLocalStorage('ranking')
              .filter(({ name }) => name !== currPlayer.name);
            currPlayer.score = score;
            addToLocalStorage('ranking', [currPlayer, ...newRanking]);
          } }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => {
            const { history } = this.props;
            history.push('/ranking');
            const currPlayer = getFromLocalStorage('ranking')[0];
            const newRanking = getFromLocalStorage('ranking')
              .filter(({ name }) => name !== currPlayer.name);
            currPlayer.score = score;
            addToLocalStorage('ranking', [currPlayer, ...newRanking]);
          } }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = () => (state) => ({
  numberOfHits: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  numberOfHits: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
