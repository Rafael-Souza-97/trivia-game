import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../componets/Header';

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
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{feedbackMessage}</p>
      </div>
    );
  }
}

const mapStateToProps = () => (state) => ({
  numberOfHits: state.player.numberOfHits,
});

Feedback.propTypes = {
  numberOfHits: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
