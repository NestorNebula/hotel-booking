import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import App from './App';

beforeEach(() => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
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
