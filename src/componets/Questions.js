import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Questions extends Component {
  render() {
    const { firstResult: { category, question }, wrongAnswers, answers } = this.props;

    return (
      <section>
        <div>
          <h1 data-testid="question-category">{ category }</h1>
          <h3 data-testid="question-text">{ question }</h3>
        </div>

        <div data-testid="answer-options">
          {answers.map((element, index) => (
            !wrongAnswers.includes(element) ? (
              <button
                type="button"
                key={ index }
                data-testid="correct-answer"
              >
                { element }
              </button>
            ) : (
              <button
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
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
