export const capitalize = (str: string | undefined) => {
  if (str === undefined || str === null || str === "") {
    return "";
  }
  const firstLetter = str[0].toUpperCase();
  const restOfString = str.slice(1);

  return firstLetter + restOfString;
};
