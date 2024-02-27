export const emailValidator = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const pwValidator = (pw) => {
  return pw.length >= 6;
};

export const validateAll = (form) => {
  const inputFields = [
    emailValidator(form?.email),
    pwValidator(form?.password),
    // !!form?.username,
  ];

  return !inputFields.includes(false);
}