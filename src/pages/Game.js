import React from 'react';
import PropTypes from 'prop-types';
import fetchQuestions from '../services/fetchs/fetchQuestions';
import Header from '../componets/Header';
import QuestionsComponent from '../componets/Questions';

class Game extends React.Component {
  state = {
    firstResult: [],
    answers: [],
    wrongAnswers: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const invalidToken = 3;
    const questions = await fetchQuestions(localStorage.getItem('token'));
    const responseCode = questions.response_code;
    if (responseCode === invalidToken) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ firstResult: questions.results[0] }, () => this.questionsResults());
    }
  }

  questionsResults() {
    const { firstResult } = this.state;
    const num = 0.5;
    const answers = [...firstResult.incorrect_answers,
      firstResult.correct_answer].sort(() => num - Math.random());
    this.setState({
      answers,
      wrongAnswers: firstResult.incorrect_answers,
    });
  }

  render() {
    const { firstResult, answers, wrongAnswers } = this.state;

    return (
      <div>
        <Header />
        <QuestionsComponent
          answers={ answers }
          firstResult={ firstResult }
          wrongAnswers={ wrongAnswers }
        />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
