import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkCurrencies, thunkExpenses, enableEditAction, editAction } from '../actions';

class AddExpense extends React.Component {
  state = {
    form: {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
    id: 0,
  };

  componentDidMount = () => {
    const { getCurrencies } = this.props;
    getCurrencies();
  };

  componentDidUpdate = (prevProps) => {
    const { edit } = this.props;
    if (edit && prevProps.edit !== edit) this.updateForm();
  };

  handleChange = (target) => {
    const { id, value } = target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [id]: value,
      },
    }));
  }

  updateForm = () => {
    const { toEdit } = this.props;
    this.setState({
      form: {
        value: parseInt(toEdit.value, 10),
        description: toEdit.description,
        currency: toEdit.currency,
        method: toEdit.method,
        tag: toEdit.tag,
      },
    });
  }

  handleEdit = (target) => {
    const { value } = target;
    const { enableEdit } = this.props;
    enableEdit(parseInt(value, 10));
  }

  submitExpense = () => {
    const { form, id } = this.state;
    const { edit, toEdit, updateExpenses, editExpense } = this.props;
    if (edit) {
      editExpense({ id: toEdit.id, ...form });
    } else {
      updateExpenses({ id, ...form });
    }
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        value: 0,
        description: '',
      },
      id: prevState.id + 1,
    }));
  }

  render() {
    const { currencies, edit } = this.props;
    const { form } = this.state;
    const { value, description, currency, method, tag } = form;

    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            id="value"
            value={ value }
            data-testid="value-input"
            onChange={ (event) => this.handleChange(event.target) }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ (event) => this.handleChange(event.target) }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            value={ currency }
            onChange={ (event) => this.handleChange(event.target) }
          >
            {
              currencies.map((current, index) => (
                <option
                  key={ index }
                  value={ current }
                >
                  { current }
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ (event) => this.handleChange(event.target) }
          >
            {
              paymentMethods.map((payMethod, index) => (
                <option
                  key={ index }
                  value={ payMethod }
                >
                  { payMethod }
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ (event) => this.handleChange(event.target) }
          >
            {
              expenseTags.map((category, index) => (
                <option
                  key={ index }
                  value={ category }
                >
                  { category }
                </option>
              ))
            }
          </select>
        </label>
        <button type="button" onClick={ this.submitExpense }>
          {
            edit ? 'Editar despesa' : 'Adicionar despesa'
          }
        </button>
      </form>
    );
  }
}

AddExpense.defaultProps = {
  toEdit: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape(),
  }),
};

AddExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  edit: PropTypes.bool.isRequired,
  toEdit: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape(),
  }),
  getCurrencies: PropTypes.func.isRequired,
  updateExpenses: PropTypes.func.isRequired,
  enableEdit: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const findToEdit = (wallet) => {
  const { editor, expenses, idToEdit } = wallet;
  if (editor) {
    const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
    return expenseToEdit;
  }
  return {};
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editar: state.wallet.editor || false,
  toEdit: findToEdit(state.wallet),
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(thunkCurrencies()),
  updateExpenses: (expense) => dispatch(thunkExpenses(expense)),
  addToWallet: (wallet) => dispatch(walletAction(wallet)),
  enableEdit: (id) => dispatch(enableEditAction(id)),
  editExpense: (wallet) => dispatch(editAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
