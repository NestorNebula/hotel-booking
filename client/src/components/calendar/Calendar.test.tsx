import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calendar from './Calendar';
import { getFakeReservation, getFakeRoom } from '@services/tests/data';
import { getDaysInMonth } from 'date-fns';
import type { Reservation } from '#types/db';

const room = getFakeRoom({ multiple: true });
const reservations: Reservation[] = [];
const date = new Date();
date.setUTCHours(0, 0, 0, 0);
const month = date.toLocaleDateString('en-US', { month: 'long' });
const year = date.getUTCFullYear();

const mockSetDate = vi.fn();

describe('Calendar', () => {
  it('renders calendar', () => {
    render(
      <Calendar room={room} reservations={reservations} setDate={mockSetDate} />
    );
    expect(
      screen.queryByText(new RegExp(`${month} ${year}`))
    ).toBeInTheDocument();
    expect(screen.queryAllByRole('button', { name: /select/i })).toHaveLength(
      getDaysInMonth(date)
    );
  });

  it('renders previous/next month when clicking on corresponding buttons', async () => {
    render(
      <Calendar room={room} reservations={reservations} setDate={mockSetDate} />
    );
    const nextMonthDate = new Date(date.toJSON());
    nextMonthDate.setDate(1);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const user = userEvent.setup();
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    expect(
      screen.queryByText(
        new RegExp(
          `${nextMonthDate.toLocaleDateString('en-US', {
            month: 'long',
          })} ${nextMonthDate.getUTCFullYear()}`
        )
      )
    ).toBeInTheDocument();
    const previousButton = screen.getByRole('button', { name: /previous/i });
    await user.click(previousButton);
    expect(
      screen.queryByText(new RegExp(`${month} ${year}`))
    ).toBeInTheDocument();
  });

  it('disables all buttons before date', () => {
    render(
      <Calendar room={room} reservations={reservations} setDate={mockSetDate} />
    );
    let day = date.getUTCDate();
    while (day > 1) {
      day = day - 1;
      expect(screen.queryByText(day.toString())).toHaveAttribute('disabled');
    }
  });

  it('disables all buttons before startDate', () => {
    const startDate = new Date();
    startDate.setDate(
      startDate.getDate() > 25
        ? startDate.getDate() + 10
        : startDate.getDate() + 2
    );
    render(
      <Calendar
        room={room}
        reservations={reservations}
        setDate={mockSetDate}
        startDate={startDate}
      />
    );
    let day = startDate.getUTCDate();
    while (day > 0) {
      expect(screen.queryByText(day.toString())).toHaveAttribute('disabled');
      day = day - 1;
    }
  });

  it('disables all buttons equals or after endDate', () => {
    const endDate = new Date();
    render(
      <Calendar
        room={room}
        reservations={reservations}
        setDate={mockSetDate}
        endDate={endDate}
      />
    );
    const month = endDate.getUTCMonth();
    while (endDate.getUTCMonth() === month) {
      const day = endDate.getDate();
      endDate.setDate(day + 1);
      expect(screen.queryByText(day.toString())).toHaveAttribute('disabled');
    }
  });

  it('disables button on date when reservations are full', async () => {
    const reservationDate = new Date(date.toJSON());
    reservationDate.setDate(reservationDate.getDate() + 2);
    reservations.push(
      getFakeReservation({ roomId: room.id, date: reservationDate }),
      getFakeReservation({ roomId: room.id, date: reservationDate })
    );
    render(
      <Calendar room={room} reservations={reservations} setDate={mockSetDate} />
    );
    if (reservationDate.getDate() > date.getDate()) {
      expect(
        screen.queryByText(reservationDate.getDate().toString())
      ).toHaveAttribute('disabled');
    } else {
      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: /next/i }));
      expect(
        screen.queryByText(reservationDate.getDate().toString())
      ).toHaveAttribute('disabled');
    }
  });

  it('disables all buttons after the day reservations are full for selecting endDate', () => {
    render(
      <Calendar
        room={room}
        reservations={reservations}
        setDate={mockSetDate}
        startDate={date}
      />
    );
    const day = new Date(reservations[0].date.toJSON());
    day.setDate(day.getDate() + 1);
    while (day.getDate() > reservations[0].date.getDate()) {
      expect(screen.queryByText(day.getDate().toString())).toBeDisabled();
      day.setDate(day.getDate() + 1);
    }
  });

  it('calls setDate only on correct date click', async () => {
    render(
      <Calendar room={room} reservations={reservations} setDate={mockSetDate} />
    );
    const user = userEvent.setup();
    await user.click(
      screen.getByText(reservations[0].date.getDate().toString())
    );
    expect(mockSetDate).not.toHaveBeenCalled();
    await user.click(screen.getByText(date.getDate().toString()));
    expect(mockSetDate).toHaveBeenCalled();
  });

  it('disables all dates before minDate', () => {
    const minDate = new Date();
    minDate.setUTCDate(minDate.getDate() + 7);
    render(
      <Calendar
        room={room}
        reservations={reservations}
        setDate={mockSetDate}
        minDate={minDate}
      />
    );
    expect(
      screen.queryByText(
        `${minDate.toLocaleDateString('en-US', {
          month: 'long',
        })} ${minDate.getUTCFullYear()}`
      )
    ).toBeInTheDocument();
    let day = minDate.getUTCDate();
    while (day > 1) {
      day--;
      expect(screen.queryByText(day.toString())).toHaveAttribute('disabled');
    }
  });

  it('disables all dates after maxDate', () => {
    const maxDate = new Date();
    render(
      <Calendar
        room={room}
        reservations={reservations}
        setDate={mockSetDate}
        maxDate={maxDate}
      />
    );
    const month = maxDate.getUTCMonth();
    while (maxDate.getUTCMonth() === month) {
      maxDate.setDate(maxDate.getDate() + 1);
      expect(screen.queryByText(maxDate.getDate().toString())).toHaveAttribute(
        'disabled'
      );
    }
  });
});
