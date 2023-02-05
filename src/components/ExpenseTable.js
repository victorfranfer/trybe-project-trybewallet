import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteAction, editAction } from '../actions';

class ExpenseTable extends React.Component {
  convertValue(value, exchangeValue) {
    return (parseFloat(value) * parseFloat(exchangeValue)).toFixed(2);
  }

  deleteExpense(id) {
    const { delExpense, expenses } = this.props;

    const upExpenses = expenses.filter((expense) => expense.id !== id);

    delExpense(upExpenses);
  }

  editExpense(expense) {
    const { editionExpense } = this.props;
    editionExpense(expense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <section className="Expenses">
        <table>
          <thead className="expenseTitle">
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="expensesTable">
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
                <td>
                  {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>
                  {this.convertValue(
                    expense.value,
                    expense.exchangeRates[expense.currency].ask,
                  )}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editExpense(expense) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (expenses) => dispatch(deleteAction(expenses)),
  editionExpense: (expense) => dispatch(editAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  delExpense: PropTypes.func.isRequired,
  editionExpense: PropTypes.func.isRequired,
};
