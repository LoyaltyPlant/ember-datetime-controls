import Ember from 'ember';

export function formatHour([hour], {locale}) {
  if (locale === "en-US") {
    if (hour < "12") {
      return `${hour} AM`;
    } else if (hour === "12") {
      return `12 PM`;
    } else if (hour < "24") {
      return `${Number(hour) - 12} PM`;
    } else if (hour === "24") {
      return `12 AM`;
    }
  } else {
    return hour;
  }
}

export default Ember.Helper.helper(formatHour);
