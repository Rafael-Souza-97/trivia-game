export const addToLocalStorage = (key, token) => (
  localStorage.setItem(key, JSON.stringify(token))
);

export const getFromLocalStorage = (key) => (
  JSON.parse(localStorage.getItem(key))
);

// setItem("chave(string)",valor)
