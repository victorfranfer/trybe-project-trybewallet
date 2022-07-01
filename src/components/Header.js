import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;

    return (
      <header>
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <div data-testid="total-field">
          { expenses }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const getTotal = (expenses) => {
  if (expenses.length > 0) {
    return expenses.reduce((total, expense) => {
      const { value, currency } = expense;
      const { ask } = expense.exchangeRates[`${currency}`];
      const subtotal = total + (value * ask);
      return Math.floor(subtotal * 100) / 100;
    }, 0);
  }
  return 0;
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: getTotal(state.wallet.expenses),
});

export default connect(mapStateToProps)(Header);
