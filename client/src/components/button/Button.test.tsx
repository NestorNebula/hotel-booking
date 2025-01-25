import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const mockOnClick = vi.fn();

beforeEach(() => {
  render(<Button onClick={mockOnClick}>Test Button</Button>);
});

describe('Button', () => {
  it('renders button with children text', () => {
    expect(
      screen.queryByRole('button', { name: 'Test Button' })
    ).toBeInTheDocument();
  });

  it('calls onClick onClick', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Test Button' });
    await user.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
