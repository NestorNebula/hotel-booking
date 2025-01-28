import { useContext, useState } from 'react';
import { format } from 'date-fns';
import { Context } from '@context';
import { getMonthWeeks, months } from '@services/date';
import type { Reservation, Room } from '#types/db';
import * as S from './Calendar.styles';

function Calendar({
  room,
  reservations,
  setDate,
  startDate,
}: {
  room: Room;
  reservations: Reservation[];
  setDate: (date: Date) => void;
  startDate?: Date;
}) {
  const { user } = useContext(Context);

  const date = startDate ?? new Date();
  date.setUTCHours(0, 0, 0, 0);
  const [calendarDate, setCalendarDate] = useState(new Date(date.toJSON()));
  const updateMonth = (direction: 'backward' | 'forward') => {
    const newCalendarDate = new Date(calendarDate.toJSON());
    newCalendarDate.setUTCDate(1);
    const month = newCalendarDate.getUTCMonth();
    newCalendarDate.setUTCMonth(
      direction === 'backward' ? month - 1 : month + 1
    );
    setCalendarDate(newCalendarDate);
  };

  const month = months[calendarDate.getUTCMonth()];
  const year = calendarDate.getUTCFullYear();

  const monthWeeks = getMonthWeeks(calendarDate);

  const maxReservationsPerDay = room.numberPerDay;

  const getCalendar = (calendarMonthWeeks: typeof monthWeeks) => {
    let unavailableDayEncountered = false;
    return calendarMonthWeeks.map((week, index) => (
      <S.Week key={`week${index}`}>
        {week.map((day) => {
          const stringDate = day && format(day, 'd MMMM y');
          const dayReservations = !day
            ? 0
            : reservations.filter(
                (r) => new Date(r.date).getTime() === day.getTime()
              ).length;
          const existingReservation =
            day &&
            !!reservations.filter(
              (r) =>
                new Date(r.date).getTime() === day.getTime() &&
                r.userId === user.id
            ).length;
          const isAvailable = !startDate
            ? day &&
              day >= date &&
              dayReservations < maxReservationsPerDay &&
              !existingReservation
            : day &&
              day > date &&
              day > startDate &&
              !unavailableDayEncountered;
          if (
            startDate &&
            (dayReservations >= maxReservationsPerDay || existingReservation)
          ) {
            unavailableDayEncountered = true;
          }
          return day ? (
            <S.Day
              key={`${day.getDate()}${month}${year}`}
              aria-label={`select ${stringDate} as ${
                startDate ? 'first day' : 'last day'
              }.${!isAvailable ? ` This day isn't available.` : ''}`}
              disabled={!isAvailable}
              onClick={() => setDate(day)}
            >
              {day.getDate()}
            </S.Day>
          ) : (
            <S.EmptyDay key={`emptyDay${Math.round(Math.random() * 10000)}`} />
          );
        })}
      </S.Week>
    ));
  };

  return (
    <S.Calendar>
      <S.Header>
        <S.PreviousButton
          aria-label="previous month"
          disabled={
            date.getUTCMonth() === calendarDate.getUTCMonth() &&
            date.getUTCFullYear() === calendarDate.getUTCFullYear()
          }
          onClick={() => updateMonth('backward')}
        ></S.PreviousButton>
        <div>{`${month} ${year}`}</div>
        <S.NextButton
          aria-label="next month"
          disabled={date.getUTCMonth() === calendarDate.getUTCMonth() + 1}
          onClick={() => updateMonth('forward')}
        />
      </S.Header>
      {getCalendar(monthWeeks)}
    </S.Calendar>
  );
}

export default Calendar;
