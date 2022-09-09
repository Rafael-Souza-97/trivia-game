export const addToLocalStorage = (key, token) => (
  localStorage.setItem(key, JSON.stringify(token))
);

export const getFromLocalStorage = (key) => (
  JSON.parse(localStorage.getItem(key))
);

export const addTokenLocalStorage = (token) => localStorage.setItem('token', token);

// setItem("chave(string)",valor)
