import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';
const mockSubmit = vi.fn();

describe('Form', () => {
  it('renders form with submit button and its given name', () => {
    render(
      <Form submit={mockSubmit} isValid={true} name="Button with a name">
        <></>
      </Form>
    );
    expect(
      screen.queryByRole('button', { name: 'Button with a name' })
    ).toBeInTheDocument();
  });

  it('calls submit onSubmit when data is valid', async () => {
    render(
      <Form submit={mockSubmit} isValid={true} name="Test">
        <></>
      </Form>
    );
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button', { name: 'Test' });
    await user.click(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
  });

  it("doesn't call submit onSubmit when data is invalid", async () => {
    render(
      <Form submit={mockSubmit} isValid={false} name="Test">
        <></>
      </Form>
    );
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button', { name: 'Test' });
    await user.click(submitButton);
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
