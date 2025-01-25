import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';

const mockDisplaySidebar = vi.fn();

beforeEach(() => {
  render(<Navbar updateSidebarDisplay={mockDisplaySidebar} />);
});

describe('Navbar', () => {
  it('calls updateSidebarDisplay on button click', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /sidebar/i });
    await user.click(button);
    expect(mockDisplaySidebar).toHaveBeenCalled();
  });
});
