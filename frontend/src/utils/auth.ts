export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token: string) => {
  return localStorage.setItem('token', token);
};

export const getEmail = () => {
  return localStorage.getItem('email');
};

export const setEmail = (email: string) => {
  return localStorage.setItem('email', email);
};
