function createDateFromDDMMYYYY(dateString) {
    const parts = dateString.split('/');
    if (parts.length !== 3) {
      return new Date(1, 0, 0).toISOString().substring(0, 10);
    }
    try {
    const day = parseInt(parts[0], 10)+1;
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
    const year = parseInt(parts[2], 10);
    if (day < 1 || day > 31 || month < 0 || month > 11 || year < 0) {
      return new Date(1, 0, 0).toISOString().substring(0, 10);
    }
    console.log(new Date(year, month, day).toISOString().substring(0, 10));

    return new Date(year, month, day).toISOString().substring(0, 10);}
    catch (error) {
      return new Date(1, 0, 0).toISOString().substring(0, 10);
    }
  }
  export default createDateFromDDMMYYYY;