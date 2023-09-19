function createDateFromDDMMYYYY(dateString) {
  // res date format : YYYY//MM/DD
  const parts = dateString.split("/");
  if (parts.length !== 3) {
    return "";
  }
  res = parts[2] + "-" + parts[1] + "-" + parts[0];
  return res;
}

export default createDateFromDDMMYYYY;
