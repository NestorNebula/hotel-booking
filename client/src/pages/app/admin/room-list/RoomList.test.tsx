import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getFakeRoom } from '@services/tests/data';
import RoomList from './RoomList';

const mockRooms = [
  getFakeRoom({ multiple: false }),
  getFakeRoom({ multiple: false }),
];
const buttonTitle = 'This is button title.';
const mockOnRoomClick = vi.fn();

beforeEach(() => {
  render(
    <RoomList
      rooms={mockRooms}
      buttonTitle={buttonTitle}
      onRoomClick={mockOnRoomClick}
    />
  );
});

describe('RoomList', () => {
  it('renders all rooms', () => {
    for (let i = 0; i < mockRooms.length; i++) {
      expect(screen.queryByText(mockRooms[0].name)).toBeInTheDocument();
    }
  });

  it('renders buttons with given title', () => {
    expect(screen.queryAllByRole('button', { name: buttonTitle })).toHaveLength(
      mockRooms.length
    );
  });

  it('calls onRoomClick when clicking on room button', async () => {
    const user = userEvent.setup();
    await user.click(screen.queryAllByRole('button', { name: buttonTitle })[0]);
    expect(mockOnRoomClick).toHaveBeenCalledWith(mockRooms[0].id);
  });
});
