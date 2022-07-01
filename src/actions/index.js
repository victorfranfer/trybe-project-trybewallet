export const loginAction = (email) => ({
  type: 'LOGIN', email,
});

export const currenciesAction = (currencies) => ({
  type: 'SET_CURRENCIES', currencies,
});

export const expensesAction = (wallet) => ({
  type: 'ADD_TO_WALLET', wallet,
});

export const deleteAction = (id) => ({
  type: 'DELETE_EXPENSE', id,
});

export const enableEditAction = (id) => ({
  type: 'ENABLE_EDIT', id,
});

export const editAction = (wallet) => ({
  type: 'EDIT_EXPENSE', wallet,
});

export function thunkCurrencies() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch(currenciesAction(currencies));
  };
}

export function thunkExpenses(expense) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(expensesAction({ ...expense, exchangeRates: data }));
  };
}
