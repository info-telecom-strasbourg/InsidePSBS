function createDateFromDDMMYYYY(dateString) {
  // res date format : YYYY//MM/DD
    const parts = dateString.split('/');
    if (parts.length !== 3) {
      return '0-0-0';
    }
    res=parts[2]+'-'+parts[1]+'-'+parts[0];
    console.log(res);
    return res}
    
  export default createDateFromDDMMYYYY;