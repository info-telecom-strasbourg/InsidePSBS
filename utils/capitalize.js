const capitalize = (str) => {
  const firstLetter = str[0].toUpperCase();
  const restOfString = str.slice(1);

  return firstLetter + restOfString;
};

export default capitalize;
