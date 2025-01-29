import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Account from './Account';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLoaderData: () => {
      return {
        reservations: [],
      };
    },
  };
});

beforeEach(() => {
  render(
    <MemoryRouter>
      <Account />
    </MemoryRouter>
  );
});

describe('Account', () => {
  it('renders user and its reservations', () => {
    expect(screen.queryByText(/your account/i)).toBeInTheDocument();
    expect(screen.queryByText(/your reservations/i)).toBeInTheDocument();
  });

  it('renders user form when clicking on edit button', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /edit/i }));
    expect(screen.queryByLabelText(/first name/i)).toBeInTheDocument();
  });

  it('renders password form when clicking on change password', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /change password/i }));
    expect(screen.queryByLabelText(/current password/i)).toBeInTheDocument();
  });
});
