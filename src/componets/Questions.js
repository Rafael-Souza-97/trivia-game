import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Questions.css';
import { updateScore } from '../redux/actions';
import store from '../redux/store';

export default class Questions extends Component {
  constructor() {
    super();

    this.state = {
      hasAnswer: false,
      timer: 30000,
      isDisabled: false,
      coutdown: 30,
      easy: 1,
      medium: 2,
      hard: 3,
      nextButton: false,
    };
  }

  componentDidMount() { this.setTimer(); }

  getAnswer = ({ target: { id, name } }) => {
    if (name === 'correct') this.setScore(id);
    this.setState({ hasAnswer: true, nextButton: true });
  };

  setScore = (currentCountDonw) => {
    const { dispatch } = store;
    const { easy, medium, hard } = this.state;
    const { firstResult: { difficulty } } = this.props;
    const bonus = 10;
    let newScore = 0;
    if (difficulty === 'easy') {
      newScore = bonus + +currentCountDonw * easy;
    }
    if (difficulty === 'medium') {
      newScore = bonus + +currentCountDonw * medium;
    }
    if (difficulty === 'hard') {
      newScore = bonus + +currentCountDonw * hard;
    }
    dispatch(updateScore(newScore));
  };

  setTimer = () => {
    const { timer } = this.state;
    const oneSecond = 1000;
    setTimeout(() => { // conta a cada 30 segundos.
      this.setState({ isDisabled: true });
    }, timer);
    setInterval(() => { // conta a cada segundo diminui o estado do countdown.
      this.setState(({ coutdown }) => ({ coutdown: coutdown - 1 }));
    }, oneSecond);
  };

  nextQuestion = () => {
    this.setTimer();
    // lembrar de manter a chamada do setTimer
  };

  render() {
    const { hasAnswer, isDisabled, coutdown, nextButton } = this.state;
    const { firstResult: { category, question }, wrongAnswers, answers } = this.props;

    return (
      <section>
        <div>
          <h1 data-testid="question-category">{ category }</h1>
          <span id="countdown">
            { coutdown }
          </span>
          <h3 data-testid="question-text">{ question }</h3>
        </div>

        <div data-testid="answer-options">
          {answers.map((element, index) => (
            wrongAnswers.includes(element) ? (
              <button
                className={ hasAnswer ? 'wrong-answer' : '' }
                type="button"
                key={ index }
                id={ coutdown }
                name="wrong"
                data-testid={ `wrong-answer-${index}` }
                disabled={ isDisabled }
                onClick={ this.getAnswer }
              >
                { element }
              </button>
            ) : (
              <button
                className={ hasAnswer ? 'correct-answer' : '' }
                type="button"
                key={ index }
                id={ coutdown }
                name="correct"
                data-testid="correct-answer"
                disabled={ isDisabled }
                onClick={ this.getAnswer }
              >
                { element }
              </button>
            )
          ))}
          <button type="button" onClick={ this.nextQuestion }>Next</button>
        </div>

        <div>
          {
            nextButton && <button type="button" data-testid="btn-next"> Next </button>
          }
        </div>
      </section>
    );
  }
}

Questions.propTypes = {
  firstAnswers: PropTypes.object,
  dispatch: PropTypes.func,
}.isRequired;
