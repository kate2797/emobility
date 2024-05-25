/**
 * Validates the email field in the most basic way (must include `@`)
 */
export const emailHasErrors = (email) => {
  if (email === "") return;
  return !email.includes("@"); // A very simple check for the MVP
};

/**
 * Validates the password (>= 6 characters to be valid)
 */
export const passwordIsTooShort = (password) => {
  if (password === "") return;
  return !(password.length >= 6); // Firebase does not accept passwords that are < 6 characters
};

/**
 * Checks form fields for missing values
 */
export const someFieldsAreMissing = (...fields) => {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i] === "") {
      return true;
    }
  }
  return false;
};
