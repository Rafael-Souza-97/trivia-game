import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Questions.css';

export default class Questions extends Component {
  constructor() {
    super();

    this.state = {
      hasAnswer: false,
    };
  }

  handleClick = () => this.setState(({ hasAnswer }) => ({ hasAnswer: !hasAnswer }));

  render() {
    const { hasAnswer } = this.state;
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
                className={ hasAnswer && 'wrong-answer' }
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.handleClick }
              >
                { element }
              </button>
            ) : (
              <button
                className={ hasAnswer && 'correct-answer' }
                type="button"
                key={ index }
                data-testid="correct-answer"
                onClick={ this.handleClick }
              >
                { element }
              </button>
            )
          ))}
        </div>
      </section>

    );
  }
}

Questions.propTypes = {
  firstAnswers: PropTypes.object,
}.isRequired;