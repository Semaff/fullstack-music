import { passwordRegexp } from "@utils/regexps/passwordRegexp";

export const validatePassword = (password: string) => {
  const isCorrectPassword = passwordRegexp.test(password);
  return isCorrectPassword && password.length > 3 && password.length < 20;
};
