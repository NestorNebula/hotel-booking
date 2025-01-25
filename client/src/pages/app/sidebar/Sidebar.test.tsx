import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';
import { getFakeRoom, getFakeUser } from '@services/tests/data';
import { Room } from '#types/db';

const mockRooms: Room[] = [];
const roomNumber = Math.round(Math.random() * 10);
for (let i = 0; i < roomNumber; i++) {
  mockRooms.push(getFakeRoom({ multiple: i % 2 === 0 }));
}
const mockUser = getFakeUser();

beforeEach(() => {
  render(<Sidebar rooms={mockRooms} user={mockUser} />);
});

describe('Sidebar', () => {
  it('renders links to all rooms', () => {
    for (let i = 0; i < mockRooms.length; i++) {
      expect(
        screen.queryByRole('link', { name: mockRooms[i].name })
      ).toBeInTheDocument();
    }
  });

  it('renders admin page link based on user status', () => {
    if (mockUser.isAdmin) {
      expect(
        screen.queryByRole('link', { name: /admin dashboard/i })
      ).toBeInTheDocument();
    } else {
      expect(
        screen.queryByRole('link', { name: /become an admin/i })
      ).toBeInTheDocument();
    }
  });
});
