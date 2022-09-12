import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchTrivia from '../services/fetchs/fetchTrivia';
import { addToLocalStorage, addTokenLocalStorage } from '../services/storage';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

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
    const ranking = [{ name, score: 0, picture: imgURL }];

    addTokenLocalStorage(token);
    addToLocalStorage('ranking', ranking);
    history.push('/game');
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
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

        <button
          disabled={ isDisabled }
          type="submit"
          data-testid="btn-play"
        >
          Play
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClick }
        >
          Configurações
        </button>

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