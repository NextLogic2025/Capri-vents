export const isValidEmail = (email = '') => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(String(email).trim());
};

export const isValidPassword = (password = '') => String(password).length >= 6;

export const isValidCode5Digits = (code = '') => /^\d{5}$/.test(String(code));

