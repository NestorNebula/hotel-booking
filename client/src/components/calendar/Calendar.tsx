import { useContext, useState, useRef } from 'react';
import { format } from 'date-fns';
import { Context } from '@context';
import { getMonthWeeks, months } from '@services/date';
import type { Reservation, Room } from '#types/db';
import { arrowLeft, arrowRight } from '@assets/icons';
import * as S from './Calendar.styles';

function Calendar({
  room,
  reservations,
  setDate,
  startDate,
  endDate,
  minDate,
  maxDate,
}: {
  room: Room;
  reservations: Reservation[];
  setDate: (date: Date) => void;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
}) {
  const { user } = useContext(Context);

  const date = startDate ?? minDate ?? new Date();
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
  const maxDay = useRef<Date | false>(false);

  const checkDate = (day: Date, recursive?: boolean): boolean => {
    if (recursive && day.getTime() === endDate!.getTime()) {
      return true;
    }
    const dayReservations = reservations.filter(
      (r) => new Date(r.date).getTime() === day.getTime()
    ).length;
    const existingReservation = !!reservations.filter(
      (r) =>
        new Date(r.date).getTime() === day.getTime() && r.userId === user.id
    ).length;
    let isAvailable: boolean = true;
    if (startDate) {
      isAvailable =
        day > date &&
        day > startDate &&
        (!maxDay.current || day < maxDay.current);
    } else {
      isAvailable =
        day >= date &&
        dayReservations < maxReservationsPerDay &&
        (!endDate || day < endDate);
      !existingReservation;
    }
    if (isAvailable) {
      if (minDate) {
        isAvailable = day >= minDate;
      }
      if (isAvailable && maxDate && !recursive) {
        isAvailable = day <= maxDate;
      }
    }
    if (
      !maxDay.current &&
      startDate &&
      day > startDate &&
      (dayReservations >= maxReservationsPerDay || existingReservation)
    ) {
      const newMaxDay = new Date(day);
      newMaxDay.setDate(day.getDate() + 1);
      maxDay.current = newMaxDay;
    }
    if (isAvailable && endDate && day < endDate) {
      const nextDay = new Date(day.toJSON());
      nextDay.setDate(nextDay.getDate() + 1);
      isAvailable = checkDate(nextDay, true);
    }
    return isAvailable;
  };

  const getCalendar = (calendarMonthWeeks: typeof monthWeeks) => {
    return calendarMonthWeeks.map((week, index) => (
      <S.Week key={`week${index}`}>
        {week.map((day) => {
          const stringDate = day && format(day, 'd MMMM y');
          const isAvailable = !day ? false : checkDate(day);
          return day ? (
            <S.Day
              key={`${day.getDate()}${month}${year}`}
              aria-label={`select ${stringDate} as ${
                startDate ? 'first day' : 'last day'
              }.${!isAvailable ? ` This day isn't available.` : ''}`}
              disabled={!isAvailable}
              onClick={() => setDate(day)}
              $firstDay={startDate && startDate.getTime() === day.getTime()}
              $lastDay={endDate && endDate.getTime() === day.getTime()}
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
        <S.ArrowButton
          aria-label="previous month"
          disabled={
            date.getUTCMonth() === calendarDate.getUTCMonth() &&
            date.getUTCFullYear() === calendarDate.getUTCFullYear()
          }
          onClick={() => updateMonth('backward')}
        >
          <img src={arrowLeft} alt="previous" />
        </S.ArrowButton>
        <div>{`${month} ${year}`}</div>
        <S.ArrowButton
          aria-label="next month"
          disabled={date.getUTCMonth() === calendarDate.getUTCMonth() + 1}
          onClick={() => updateMonth('forward')}
        >
          <img src={arrowRight} alt="next" />
        </S.ArrowButton>
      </S.Header>
      {getCalendar(monthWeeks)}
    </S.Calendar>
  );
}

export default Calendar;
