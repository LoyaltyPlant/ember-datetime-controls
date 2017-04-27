import Ember from 'ember';
import moment from 'moment';

const {
  A,
  Route
} = Ember;

export default Route.extend({
  model() {
    const disabledDates = [],
      todayDate = new Date(),
      tommorrowDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() +1),
      nextWeekDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() +7),
      yesterdayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 1),
      newYorkDate = moment.tz('America/New_York').toDate(),
      berlinDate = moment.tz('Europe/Berlin').toDate(),
      moscowDate = moment.tz('Europe/Moscow').toDate();

    const datesList = A([new Date(), new Date()]);
    disabledDates.push(tommorrowDate);

    return {
      newYorkDate,
      berlinDate,
      yesterdayDate,
      nextWeekDate,
      moscowDate,
      disabledDates,
      todayDate,
      minDate: moment().subtract(2, 'days').startOf('day').toDate(),
      maxDate: moment().add(2, 'days').startOf('day').toDate(),
      datesList
    };
  }
});
