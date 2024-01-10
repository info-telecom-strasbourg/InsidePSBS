const getTimeDifference = (date: Date) => {
  const currentDate = new Date();
  const inputDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  const timeDifference = inputDate.getTime() - currentDate.getTime();
  const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  switch (dayDifference) {
    case 0:
      return "Aujourd'hui";
    case -1:
      return "Hier";
    case 1:
      return "Demain";
  }

  if (dayDifference < -1) return `Il y a ${-dayDifference} jours`;
  if (dayDifference > 1) return `Dans ${dayDifference} jours`;
};

export default getTimeDifference;
