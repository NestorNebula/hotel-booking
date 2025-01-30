import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import Admin from './Admin';
import {
  getFakeReservation,
  getFakeRoom,
  getFakeUser,
} from '@services/tests/data';
import { Reservation, User } from '#types/db';

const mockUser = { ...getFakeUser(), isAdmin: false };
const mockAdmin = { ...getFakeUser(), isAdmin: true };
const mockRooms = [
  getFakeRoom({ multiple: true }),
  getFakeRoom({ multiple: false }),
];
const mockReservations: (Reservation & { isUser: boolean; user: User })[] = [
  getFakeReservation({ userId: mockAdmin.id, roomId: mockRooms[0].id }),
  getFakeReservation({ userId: mockUser.id, roomId: mockRooms[0].id }),
  getFakeReservation({ userId: mockAdmin.id, roomId: mockRooms[0].id }),
  getFakeReservation({ userId: mockAdmin.id, roomId: mockRooms[1].id }),
].map((r) => ({
  ...r,
  isUser: r.userId === mockAdmin.id,
  user: r.userId === mockAdmin.id ? mockAdmin : mockUser,
}));

beforeEach(() => {
  render(
    <MemoryRouter>
      <Admin />
    </MemoryRouter>
  );
});

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLoaderData: () => {
      return {
        reservations: mockReservations,
      };
    },
  };
});

const mockContext = vi.spyOn(React, 'useContext');
mockContext.mockImplementation(() => {
  return {
    user: mockAdmin,
    rooms: mockRooms,
  };
});
mockContext.mockImplementationOnce(() => {
  return {
    user: mockUser,
    rooms: mockRooms,
  };
});

describe('Admin', () => {
  it("renders admin form when user isn't an admin", () => {
    expect(screen.queryByLabelText(/admin password/i)).toBeInTheDocument();
  });

  it('renders all reservations when user is admin', () => {
    expect(screen.queryAllByText(/reserved/i)).toHaveLength(
      mockReservations.length
    );
  });

  it('displays reservations users names', () => {
    expect(screen.queryAllByText(/you/i)).toHaveLength(
      mockReservations.filter((r) => r.isUser).length
    );
    expect(
      screen.queryAllByText(
        new RegExp(`${mockUser.firstName} ${mockUser.lastName}`)
      )
    ).toHaveLength(mockReservations.filter((r) => !r.isUser).length);
  });

  it('only displays a room reservations after clicking on it', async () => {
    const user = userEvent.setup();
    await user.click(
      screen.getAllByRole('button', {
        name: 'Room Reservations',
      })[0]
    );
    expect(screen.queryAllByText(/reserved/i)).toHaveLength(
      mockReservations.filter((r) => r.roomId === mockRooms[0].id).length
    );
  });
});
