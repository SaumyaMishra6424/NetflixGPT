export const checkValidate = (email, password) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;

  if (!isEmailValid) return "Invalid email";
  if (!isPasswordValid) return "Password too short";

  return null;
};