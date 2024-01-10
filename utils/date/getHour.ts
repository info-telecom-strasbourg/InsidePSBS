const getHour = (date: Date) => {
  const dateObject = new Date(date);

  const minutes = dateObject.getMinutes();
  const hours = dateObject.getHours();

  const stringMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const stringHours = hours < 10 ? `0${hours}` : `${hours}`;

  return `${stringHours}:${stringMinutes}`;
};

export default getHour;
