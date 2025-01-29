import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PasswordForm from './PasswordForm';
import { getFakeUser } from '@services/tests/data';

describe('PasswordForm', () => {
  it('renders all fields', () => {
    render(
      <MemoryRouter>
        <PasswordForm user={getFakeUser()} />
      </MemoryRouter>
    );
    expect(screen.queryByLabelText(/current password/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/new password/i)).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/confirm new password/i)
    ).toBeInTheDocument();
  });
});
