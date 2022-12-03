export const validateName = (name: string) => {
  const isNotForeignLetters = /^[a-zA-Z]+$/.test(name);
  return isNotForeignLetters && name.length > 2;
};
