import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    nome: '',
    email: '',
    isDisabled: true,
  };

  loginValidators = () => {
    const { nome, email } = this.state;
    if (nome.length > 0 && email.length > 0) {
      this.setState({
        isDisabled: false,

      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.loginValidators);
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { nome, email, isDisabled } = this.state;
    console.log(isDisabled);
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="login">
          <input
            name="nome"
            value={ nome }
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

      </form>
    );
  }
}

Login.propTypes = {
  nome: PropTypes.string,
  email: PropTypes.string,
  isDisabled: PropTypes.bool,
}.isRequired;

export default connect()(Login);
