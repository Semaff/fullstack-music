export const formatName = (name: string) => {
  if (name.length < 25) {
    return name;
  }

  return name.slice(0, 22) + "...";
};
