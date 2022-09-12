import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Questions.css';

export default class Questions extends Component {
  constructor() {
    super();

    this.state = {
      hasAnswer: false,
      timer: 30000,
      isDisabled: false,
    };
  }

  componentDidMount() { this.setTimer(); }

  getAnswer = () => this.setState({ hasAnswer: true });

  setTimer = () => {
    const { timer } = this.state;
    setTimeout(() => {
      this.getAnswer();
      this.setState({ isDisabled: true });
    }, timer);
  };

  nextQuestion = () => {
    this.setTimer();
    // lembrar de manter a chamada do setTimer
  };

  render() {
    const { hasAnswer, isDisabled } = this.state;
    const { firstResult: { category, question }, wrongAnswers, answers } = this.props;

    return (
      <section>
        <div>
          <h1 data-testid="question-category">{ category }</h1>
          <h3 data-testid="question-text">{ question }</h3>
        </div>

        <div data-testid="answer-options">
          {answers.map((element, index) => (
            wrongAnswers.includes(element) ? (
              <button
                className={ hasAnswer ? 'wrong-answer' : '' }
                type="button"
                key={ index }
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
      </section>

    );
  }
}

Questions.propTypes = {
  firstAnswers: PropTypes.object,
}.isRequired;
