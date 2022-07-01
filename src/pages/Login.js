import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  state= {
    email: '',
    password: '',
    isDisabled: true,
  }

  handleChange = (target) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
    this.isDisabled();
  }

  isDisabled = () => {
    const { email, password } = this.state;
    const testEmail = /\S+@\S+\.\S+/;
    const minCharNumber = 5;
    if (testEmail.test(email) && password.length >= minCharNumber) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  submitLogin = () => {
    const { email } = this.state;
    const { history, login } = this.props;
    login(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="email">
            E-mail
            <input
              type="text"
              id="email"
              data-testid="email-input"
              value={ email }
              onChange={ (event) => this.handleChange(event.target) }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              id="password"
              data-testid="password-input"
              value={ password }
              onChange={ (event) => this.handleChange(event.target) }
            />
          </label>
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ () => this.submitLogin() }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
