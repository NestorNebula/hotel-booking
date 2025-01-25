import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from './Sidebar';
import { getFakeRoom, getFakeUser } from '@services/tests/data';
import { Room, User } from '#types/db';

const mockClose = vi.fn();
const mockRooms: Room[] = [];
const roomNumber = Math.round(Math.random() * 10);
for (let i = 0; i < roomNumber; i++) {
  mockRooms.push(getFakeRoom({ multiple: i % 2 === 0 }));
}
const mockUser: User & { isGuest: false } = {
  ...getFakeUser(),
  isGuest: false,
};

beforeEach(() => {
  render(<Sidebar close={mockClose} rooms={mockRooms} user={mockUser} />);
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

  it('calls close when clicking on close button', async () => {
    const user = userEvent.setup();
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(mockClose).toHaveBeenCalled();
  });
});
