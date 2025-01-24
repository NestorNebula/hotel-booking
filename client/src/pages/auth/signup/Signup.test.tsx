import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Signup from './Signup';

beforeEach(() => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
});

describe('Signup', () => {
  it('renders all fields', () => {
    expect(screen.queryByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.queryByLabelText('password')).toBeInTheDocument();
  });
});
