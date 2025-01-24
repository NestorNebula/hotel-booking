import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const mockUpdateValue = vi.fn();

describe('Input', () => {
  it('renders correctly', () => {
    render(
      <Input
        name="test"
        updateValue={mockUpdateValue}
        validation={{ isValid: true, message: '' }}
        value="test"
      />
    );
    expect(screen.queryByText('test')).toBeInTheDocument();
  });

  it('renders error message when isValid is false', () => {
    render(
      <Input
        name="test"
        updateValue={mockUpdateValue}
        validation={{ isValid: false, message: 'Error message' }}
        value="test"
      />
    );
    expect(screen.queryByText('Error message')).toBeInTheDocument();
  });

  it('calls updateValue onChange', async () => {
    render(
      <Input
        name="test"
        updateValue={mockUpdateValue}
        validation={{ isValid: true, message: '' }}
        value="test"
      />
    );
    const user = userEvent.setup();
    const input = screen.getByLabelText('test');
    await user.type(input, 'new');
    expect(mockUpdateValue).toHaveBeenCalled();
    expect(screen.queryByText('test')).toBeInTheDocument();
  });
});
