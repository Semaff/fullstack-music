import { emailRegexp } from "utils/regexps/emailRegexp";

export const validateEmail = (email: string) => {
  const isEmail = emailRegexp.test(email);
  return isEmail && email.length > 6;
};
