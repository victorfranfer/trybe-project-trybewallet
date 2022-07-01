import React from 'react';
import Header from '../components/Header';
import AddExpense from '../components/AddExpense';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AddExpense />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
