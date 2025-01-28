import { getISODay } from 'date-fns';

const months: [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type DateOrNull = Date | null;
type Week = [
  DateOrNull,
  DateOrNull,
  DateOrNull,
  DateOrNull,
  DateOrNull,
  DateOrNull,
  DateOrNull
];
type MonthWeeks = Week[];

function isWeek(week: unknown): week is Week {
  return (week as Week).length === 7;
}

const getMonthWeeks: (date: Date) => MonthWeeks = (date) => {
  let day = new Date(date.toJSON());
  day.setUTCDate(1);
  const monthNumber = day.getMonth();
  const month: MonthWeeks = [];
  while (day.getMonth() === monthNumber) {
    const week: DateOrNull[] = [];
    for (let i = 0; i < 7; i++) {
      let weekDay = getISODay(day) - 1;
      if (weekDay === week.length) {
        week.push(
          day.getMonth() === monthNumber ? new Date(day.toJSON()) : null
        );
        day.setDate(day.getDate() + 1);
      } else {
        week.push(null);
      }
    }
    isWeek(week) && month.push(week);
  }
  return month;
};

export { months, getMonthWeeks };
