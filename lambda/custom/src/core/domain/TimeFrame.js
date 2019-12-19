'use strict';
const moment = require('moment');
const InvalidTimeFrame = require('./errors/InvalidTimeFrame');
const TIME_FRAMES_NAMES = {
  THIS_WEEK: 'this_week',
  NEXT_WEEK: 'next_week',
  THIS_MONTH: 'this_month',
  NEXT_MONTH: 'next_month',
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  JANUARY: 'january',
  FEBRUARY: 'february',
  MARCH: 'march',
  APRIL: 'april',
  MAY: 'may',
  JUNE: 'june',
  JULY: 'july',
  AUGUST: 'august',
  SEPTEMBER: 'september',
  OCTOBER: 'october',
  NOVEMBER: 'november',
  DECEMBER: 'december',
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday',
};

const TimeFrame = ({ name, from, to }) => {
  const that = {};
  _guardName(name);

  that.name = () => name;
  that.from = () => from;
  that.to = () => to;

  function _guardName(name) {
    if (!name || !TIME_FRAMES_NAMES[name.toUpperCase()])
      throw new InvalidTimeFrame(`Invalid timeframe name ${name}`);
  }

  return that;
};

const ThisWeek = () => {
  const name = TIME_FRAMES_NAMES.THIS_WEEK;
  const from = moment().startOf('week');
  const to = moment().endOf('week');
  return TimeFrame({ name, from, to });
};

const NextWeek = () => {
  const name = TIME_FRAMES_NAMES.NEXT_WEEK;
  const nextWeek = moment().add(1, 'week');
  const from = nextWeek.clone().startOf('week');
  const to = nextWeek.clone().endOf('week');
  return TimeFrame({ name, from, to });
};

const ThisMonth = () => {
  const name = TIME_FRAMES_NAMES.THIS_MONTH;
  const from = moment().startOf('month');
  const to = moment().endOf('month');
  return TimeFrame({ name, from, to });
};

const NextMonth = () => {
  const name = TIME_FRAMES_NAMES.NEXT_MONTH;
  const nextMonth = moment().add(1, 'month');
  const from = nextMonth.clone().startOf('month');
  const to = nextMonth.clone().endOf('month');
  return TimeFrame({ name, from, to });
};

const Today = () => {
  const name = TIME_FRAMES_NAMES.TODAY;
  const from = moment().startOf('day');
  const to = moment().endOf('day');
  return TimeFrame({ name, from, to });
};

const Tomorrow = () => {
  const name = TIME_FRAMES_NAMES.TOMORROW;
  const tomorrow = moment().add(1, 'day');
  const from = tomorrow.clone().startOf('day');
  const to = tomorrow.clone().endOf('day');
  return TimeFrame({ name, from, to });
};

const Month = ({ month }) => {
  const name = month;
  const d = moment(month, 'MMMM');
  const from = d.clone().startOf('month');
  const to = d.clone().endOf('month');
  return TimeFrame({ name, from, to });
};

const Day = ({ day }) => {
  const name = day;
  const d = moment(day, 'dddd');
  const from = d.clone().startOf('day');
  const to = d.clone().endOf('day');
  return TimeFrame({ name, from, to });
};

const TimeFrameByName = ({ name }) => {
  switch (name) {
    case TIME_FRAMES_NAMES.THIS_WEEK:
      return ThisWeek();
    case TIME_FRAMES_NAMES.NEXT_WEEK:
      return NextWeek();
    case TIME_FRAMES_NAMES.NEXT_MONTH:
      return NextMonth();
    case TIME_FRAMES_NAMES.THIS_MONTH:
      return ThisMonth();
    case TIME_FRAMES_NAMES.TODAY:
      return Today();
    case TIME_FRAMES_NAMES.TOMORROW:
      return Tomorrow();
    case TIME_FRAMES_NAMES.JANUARY:
    case TIME_FRAMES_NAMES.FEBRUARY:
    case TIME_FRAMES_NAMES.MARCH:
    case TIME_FRAMES_NAMES.APRIL:
    case TIME_FRAMES_NAMES.MAY:
    case TIME_FRAMES_NAMES.JUNE:
    case TIME_FRAMES_NAMES.JULY:
    case TIME_FRAMES_NAMES.AUGUST:
    case TIME_FRAMES_NAMES.SEPTEMBER:
    case TIME_FRAMES_NAMES.OCTOBER:
    case TIME_FRAMES_NAMES.NOVEMBER:
    case TIME_FRAMES_NAMES.DECEMBER:
      return Month({ month: name });
    case TIME_FRAMES_NAMES.MONDAY:
    case TIME_FRAMES_NAMES.TUESDAY:
    case TIME_FRAMES_NAMES.WEDNESDAY:
    case TIME_FRAMES_NAMES.THURSDAY:
    case TIME_FRAMES_NAMES.FRIDAY:
    case TIME_FRAMES_NAMES.SATURDAY:
    case TIME_FRAMES_NAMES.SUNDAY:
      return Day({ day: name });
    default:
      throw new InvalidTimeFrame(`Invalid timeframe name ${name}`);
  }
};

module.exports = {
  TimeFrame,
  ThisWeek,
  NextWeek,
  ThisMonth,
  NextMonth,
  Today,
  Tomorrow,
  Day,
  Month,
  TimeFrameByName,
};
