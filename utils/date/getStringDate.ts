export const getStringDateTime = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const stringDay = String(day).length === 1 ? `0${day}` : day;
  const stringMonth = String(month).length === 1 ? `0${month}` : month;
  const stringHours = String(hours).length === 1 ? `0${hours}` : hours;
  const stringMinutes = String(minutes).length === 1 ? `0${minutes}` : minutes;

  return `${stringDay}/${stringMonth}/${year} à ${stringHours}h${stringMinutes}`;
};

export const getStringDate = (date: Date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const stringDay = String(day).length === 1 ? `0${day}` : day;
  const stringMonth = String(month).length === 1 ? `0${month}` : month;
  return `${stringDay}/${stringMonth}/${year}`;
};
