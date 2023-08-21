const getHour = (date) => {
  const dateObject = new Date(date);
  let hour = dateObject.getHours();
  let minutes = dateObject.getMinutes();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hour < 10) hour = `0${hour}`;

  return `${hour}:${minutes}`;
};

export default getHour;
