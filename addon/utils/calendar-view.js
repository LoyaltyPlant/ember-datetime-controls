import moment from "moment";
import {getLocaleWeekDays, getLocaleFirstDayOfWeek} from "ember-datetime-controls/utils/locale";
import numericDate from "ember-datetime-controls/utils/numeric-date";

export class Week {
  constructor(index) {
    this.index = index;
    this.dates = [];
  }
}

export class CalendarLocaleInfo {

  constructor(locale) {
    this._locale = locale;
    this._startWeekDay = getLocaleFirstDayOfWeek(locale);
  }

  get startWeekDay() {
    return this._startWeekDay;
  }

  get locale() {
    return this._locale;
  }
}

export class MonthInfo {

  constructor(year, month, timeZone, calendarLocale) {
    this.month = month;

    let monthFirstDate = moment.tz([year, month, 1], timeZone);
    this.daysInMonth = monthFirstDate.daysInMonth();
    this.monthFirstWeekDay = monthFirstDate.day();

    this.monthFirstDate = numericDate(year, month);
    this.monthLastDate = numericDate(year, month, this.daysInMonth);
  }
}

export class WeekView {

}

export default class CalendarMonthView {

  constructor(year, month, timeZone, locale, minDate, maxDate, disabledDates) {
    this.year = year;
    this.timeZone = timeZone;
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.disabledDates = disabledDates;

    this.localeInfo = new CalendarLocaleInfo(locale);
    this.monthInfo = new MonthInfo(year, month, timeZone, this.localeInfo);
  }

  get weeks() {
    const weeks = [];
    let week = new Week();

    // if (monthFirstDate.day() === 0 && calendarLocale.startWeekDay === 1) {

    let monthDatesBefore = (this.monthInfo.monthFirstWeekDay === 0 && this.localeInfo.startWeekDay === 1 ? -5 : (2 - this.monthInfo.monthFirstWeekDay) );
    while (monthDatesBefore <= 0) {
      week.dates.push(monthDatesBefore);
      monthDatesBefore++;
    }

    let date = 0;
    do {
      date++;
      week.dates.push(date);
      if (week.dates.length % 7 === 0) {
        weeks.push(week);
        week = new Week();
      }
    } while (date < this.monthInfo.daysInMonth);

    if (week.dates.length > 0) {
      weeks.push(week);
    }

    return weeks;
  }

  get weekDays() {
    return getLocaleWeekDays(this._localeInfo.locale);
  }

}
