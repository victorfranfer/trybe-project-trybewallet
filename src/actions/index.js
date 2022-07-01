export const loginAction = (email) => ({
  type: 'LOGIN', email,
});

export const currenciesAction = (currencies) => ({
  type: 'SET_CURRENCIES', currencies,
});
