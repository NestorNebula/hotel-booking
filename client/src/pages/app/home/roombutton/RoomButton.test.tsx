import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoomButton from './RoomButton';
import { getFakeRoom } from '@services/tests/data';

const mockRoom = getFakeRoom({ multiple: false });
const mockOnClick = vi.fn();

beforeEach(() => {
  render(<RoomButton room={mockRoom} onClick={mockOnClick} />);
});

describe('RoomButton', () => {
  it('renders room main informations', () => {
    expect(screen.queryByText(mockRoom.name)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${mockRoom.pricePerDay}`))
    ).toBeInTheDocument();
  });

  it('calls onClick onClick', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
