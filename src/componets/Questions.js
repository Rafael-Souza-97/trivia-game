import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Questions.css';
import { connect } from 'react-redux';
import { updateNumberOfHits, updateScore } from '../redux/actions';
import store from '../redux/store';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      hasAnswer: false,
      timer: 30000,
      isDisabled: false,
      countdown: 30,
      easy: 1,
      medium: 2,
      hard: 3,
      nextButton: false,
      numberOfHits: 0,
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  getAnswer = ({ target: { id, name } }) => {
    if (name === 'correct') {
      this.setScore(id);
      this.setState(({ numberOfHits }) => ({ numberOfHits: numberOfHits + 1 }));
    }
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

  setTimer = (clear) => {
    const { timer } = this.state;
    const oneSecond = 1000;
    setTimeout(() => { // conta a cada 30 segundos.
      this.setState({ isDisabled: true, hasAnswer: true, nextButton: true });
    }, timer);

    const myInterval = setInterval(() => {
      this.setState(({ countdown }) => ({ countdown: countdown - 1 }));
    }, oneSecond);

    if (clear) clearInterval(myInterval);
  };

  nextQuestion = () => {
    const { numberOfHits } = this.state;
    const { increaseIndex, indexOfResults, history } = this.props;
    const numberOfQuestions = 4;

    if (indexOfResults === numberOfQuestions) {
      store.dispatch(updateNumberOfHits(numberOfHits));
      history.push('/feedback');
    }
    this.setTimer('clear');
    increaseIndex();
    this.setState({ hasAnswer: false, countdown: 30, isDisabled: false });
  };

  render() {
    const { hasAnswer, isDisabled, countdown, nextButton } = this.state;
    const { firstResult: { category, question }, wrongAnswers, answers } = this.props;

    return (
      <section>
        <div>
          <h1 data-testid="question-category">{ category }</h1>
          <span id="countdown">
            { countdown }
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
                id={ countdown }
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
                id={ countdown }
                name="correct"
                data-testid="correct-answer"
                disabled={ isDisabled }
                onClick={ this.getAnswer }
              >
                { element }
              </button>
            )
          ))}
        </div>

        <div>
          {
            nextButton && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextQuestion }
              >
                Next
              </button>
            )
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

export default connect()(Questions);
