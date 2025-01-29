import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AccountForm from './AccountForm';
import { getFakeUser } from '@services/tests/data';

describe('AccountForm', () => {
  it('renders all fields', () => {
    render(<AccountForm user={getFakeUser()} />);
    expect(screen.queryByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/email/i)).toBeInTheDocument();
  });
});
