import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import fetchTrivia from '../services/fetchs/fetchTrivia';
import { addToLocalStorage,
  addTokenLocalStorage, getFromLocalStorage } from '../services/storage';
import store from '../redux/store';
import { resetScore } from '../redux/actions';
import triviaLogo from '../trivia.png'
import '../styles/login.css'

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  componentDidMount() {
    if (!getFromLocalStorage('ranking')) addToLocalStorage('ranking', []);
  }

  loginValidators = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        isDisabled: false,

      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.loginValidators);
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { history } = this.props;
    const { token } = await fetchTrivia();
    const { name, email } = this.state;
    const imgURL = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    const player = { name, score: 0, picture: imgURL };
    const currRanking = getFromLocalStorage('ranking');
    if (currRanking) {
      addToLocalStorage('ranking', [player, ...currRanking]);
    } else {
      addToLocalStorage('ranking', [player]);
    }

    addTokenLocalStorage(token);

    store.dispatch(resetScore(0));
    history.push('/game');
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit } className="login-container" >
        
        <img src={triviaLogo} alt="trivia-logo" className='logo'></img>

        <label htmlFor="login">
          <input
            name="name"
            value={ name }
            type="text"
            id="login"
            placeholder="Seu Nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />

        </label>

        <label htmlFor="email">
          <input
            name="email"
            value={ email }
            type="email"
            id="email"
            placeholder="Seu Email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />

        </label>
      <div className='button-container'>
        <button
          disabled={ isDisabled }
          type="submit"
          data-testid="btn-play"
        >
          Play
        </button>

        <button
          className='config'
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClick }
        >
          Configurações
        </button>
      </div>


      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default connect()(Login);
