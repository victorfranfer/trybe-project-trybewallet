// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export const deleteExpense = (expenses, id) => {
  const updateExpenses = expenses.filter((expense) => expense.id !== id);
  return updateExpenses;
};

export const filteredState = (expenses, idToEdit, editedExpense) => {
  const prevExpenses = expenses.filter((expense) => expense.id !== idToEdit);
  const updateExpenses = [...prevExpenses, editedExpense];
  return updateExpenses.sort((a, b) => a.id - b.id);
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'ADD_TO_WALLET':
    return {
      ...state,
      expenses: [...state.expenses, action.wallet],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: deleteExpense(state.expenses, action.id),
    };
  case 'ENABLE_EDIT':
    return {
      ...state,
      editor: !state.editor,
      idToEdit: action.id,
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: !state.editor,
      expenses: filteredState(state.expenses, state.idToEdit, action.wallet),
    };
  default:
    return state;
  }
};

export default wallet;
