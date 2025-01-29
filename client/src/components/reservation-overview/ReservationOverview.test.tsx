import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReservationOverview from './ReservationOverview';
import { getFakeRoom } from '@services/tests/data';

const room = getFakeRoom({ multiple: false });
const mockReserve = vi.fn();
const mockEdit = vi.fn();
const mockRemove = vi.fn();

const numberOfNights = Math.ceil(Math.random() * 10);
const startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);
const endDate = new Date(startDate.toJSON());
endDate.setDate(startDate.getDate() + numberOfNights);
const dates = {
  start: startDate,
  end: endDate,
};

describe('ReservationOverview', () => {
  it('renders reservations overview', () => {
    render(<ReservationOverview room={room} dates={dates} />);
    expect(screen.queryByText(room.name)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${numberOfNights} night`))
    ).toBeInTheDocument();
    expect(
      screen.queryByText(`$${numberOfNights * room.pricePerDay}`)
    ).toBeInTheDocument();
  });

  it('calls reserve on reserve button click when provided', async () => {
    render(
      <ReservationOverview room={room} dates={dates} reserve={mockReserve} />
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /reserve/i }));
    expect(mockReserve).toHaveBeenCalled();
  });

  it('calls edit on edit button click when provided', async () => {
    render(<ReservationOverview room={room} dates={dates} edit={mockEdit} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /edit/i }));
    expect(mockEdit).toHaveBeenCalled();
  });

  it('calls remove on delete button click when provided', async () => {
    render(
      <ReservationOverview room={room} dates={dates} remove={mockRemove} />
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockRemove).toHaveBeenCalled();
  });
});
