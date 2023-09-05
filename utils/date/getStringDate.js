export const getStringDateTime = (date) => {
  const dateObj = new Date(date);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  day = String(day).length === 1 ? `0${day}` : day;
  month = String(month).length === 1 ? `0${month}` : month;
  hours = String(hours).length === 1 ? `0${hours}` : hours;
  minutes = String(minutes).length === 1 ? `0${minutes}` : minutes;

  return `${day}/${month}/${year} à ${hours}h${minutes}`;
};

export const getStringDate = (date) => {
  const dateObj = new Date(date);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  day = String(day).length === 1 ? `0${day}` : day;
  month = String(month).length === 1 ? `0${month}` : month;
  return `${day}/${month}/${year}`;
};
