import moment from 'moment';

export default function fromNow(time) {

    const duration = moment.duration(moment().diff(time));
  
    const seconds = duration.asSeconds();
  
    if (seconds < 60) {
      return `il y a ${Math.round(seconds)} secondes`;
    } else if (seconds < 3600) {
      return `il y a ${Math.round(seconds / 60)} minutes`;
    } else if (seconds < 86400) {
      return `il y a ${Math.round(seconds / 3600)} heures`;
    } else if (seconds < 86400*30) {
      return `il y a ${Math.round(seconds / 86400)} jours`;
    }
    else if (seconds < (86400*30*12)) {
        return `il y a ${Math.round(seconds / (86400*30))} mois`;
    }
    else  {
      return `il y a ${Math.round(seconds / (86400*30*12))} ans`;
    }
  };