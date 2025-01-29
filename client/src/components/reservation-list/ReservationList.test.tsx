import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ReservationList from './ReservationList';
import {
  getFakeReservation,
  getFakeRoom,
  getFakeUser,
} from '@services/tests/data';
import type { Reservation, Room } from '#types/db';

const mockUser = getFakeUser();
const dummyUser = getFakeUser();
const mockUsers = [mockUser, dummyUser];
const mockRooms: Room[] = [
  getFakeRoom({ multiple: false }),
  getFakeRoom({ multiple: false }),
];
const mockReservations: (Reservation & { isUser: boolean })[] = [
  getFakeReservation({ userId: mockUser.id, roomId: mockRooms[0].id }),
  getFakeReservation({ userId: dummyUser.id, roomId: mockRooms[0].id }),
  getFakeReservation({ userId: mockUser.id, roomId: mockRooms[0].id }),
].map((r) => ({ ...r, isUser: r.userId === mockUser.id }));
const extendedReservations: (Reservation.WithUser & { isUser: boolean })[] =
  mockReservations.map((r) => ({
    ...r,
    user: mockUsers.find((u) => u.id === r.userId) || getFakeUser(),
    isUser: r.userId === mockUser.id,
  }));

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => {
      return {
        user: mockUser,
        rooms: mockRooms,
      };
    },
  };
});

describe('ReservationList', () => {
  it('renders reservations without name when no extended infos are given', () => {
    render(
      <MemoryRouter>
        <ReservationList reservations={mockReservations} />
      </MemoryRouter>
    );
    expect(screen.queryAllByText(/night/i)).toHaveLength(
      mockReservations.length
    );
  });

  it('renders users names with reservations when extended reservations are given', () => {
    render(
      <MemoryRouter>
        <ReservationList reservations={extendedReservations} />
      </MemoryRouter>
    );
    expect(
      screen.queryAllByText(
        new RegExp(`${dummyUser.firstName} ${dummyUser.lastName}`)
      )
    ).toHaveLength(
      extendedReservations.filter((r) => r.userId === dummyUser.id).length
    );
  });

  it('renders "You" instead of user name with reservations when extended reservations are given', () => {
    render(
      <MemoryRouter>
        <ReservationList reservations={extendedReservations} />
      </MemoryRouter>
    );
    expect(screen.queryAllByText(/you/i)).toHaveLength(
      extendedReservations.filter((r) => r.userId === mockUser.id).length
    );
  });

  it('renders delete button for user reservations', () => {
    render(
      <MemoryRouter>
        <ReservationList reservations={mockReservations} />
      </MemoryRouter>
    );
    expect(screen.queryAllByRole('button', { name: /delete/i })).toHaveLength(
      mockReservations.filter((r) => r.userId === mockUser.id).length
    );
  });
});
