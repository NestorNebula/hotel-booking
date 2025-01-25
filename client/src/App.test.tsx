import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { getFakeRoom, getFakeUser } from '@services/tests/data';

const mockUser = getFakeUser();
const mockRooms = [
  getFakeRoom({ multiple: false }),
  getFakeRoom({ multiple: true }),
];

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLoaderData: () => {
      return {
        rooms: mockRooms,
        user: mockUser,
      };
    },
  };
});

beforeEach(() => {
  render(<App />);
});

describe('App', () => {
  it('renders Navbar', () => {
    expect(
      screen.queryByRole('button', { name: /sidebar/i })
    ).toBeInTheDocument();
  });

  it('renders sidebar after clicking on button', async () => {
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /sidebar/i });
    await user.click(button);
    expect(screen.queryByText('Home')).toBeInTheDocument();
  });

  it('remove sidebar after clicking on any close button', async () => {
    const user = userEvent.setup();
    const openButton = screen.getByRole('button', { name: /sidebar/i });
    await user.click(openButton);
    let closeButtons = screen.getAllByRole('button', { name: /close/i });
    await user.click(closeButtons[0]);
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    await user.click(openButton);
    closeButtons = screen.getAllByRole('button', { name: /close/i });
    await user.click(closeButtons[1]);
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });
});
