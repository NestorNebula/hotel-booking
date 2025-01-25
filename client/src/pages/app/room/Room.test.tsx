import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Room from './Room';
import { getFakeRoom, getFakeUser } from '@services/tests/data';

const mockUser = getFakeUser();
const mockRooms = [
  getFakeRoom({ multiple: true }),
  getFakeRoom({ multiple: false }),
];
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => {
      return {
        rooms: mockRooms,
        user: mockUser,
      };
    },
  };
});

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: () => {
      return {
        roomId: mockRooms[0].id,
      };
    },
  };
});

beforeEach(() => {
  render(
    <MemoryRouter>
      <Room />
    </MemoryRouter>
  );
});

describe('Room', () => {
  it('renders room informations', () => {
    expect(screen.queryByText(mockRooms[0].name)).toBeInTheDocument();
    expect(
      screen.queryByText(new RegExp(`${mockRooms[0].pricePerDay}`))
    ).toBeInTheDocument();
  });

  it('renders button to book room', () => {
    expect(screen.queryByText(/reserve/i)).toBeInTheDocument();
  });
});
