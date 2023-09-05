const getWeek = (date) => {
  const currentDate = new Date(date);
  const firstDay = currentDate.getDate() - ((currentDate.getDay() + 6) % 7);
  const week = new Array(7).fill(0).map((_, i) => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(firstDay + i);
    return nextDay;
  });
  return week;
};

export default getWeek;
