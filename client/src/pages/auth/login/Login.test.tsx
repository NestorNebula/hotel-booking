import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './Login';

beforeEach(() => {
  render(<Login />);
});

describe('Login', () => {
  it('renders all fields', () => {
    expect(screen.queryByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).toBeInTheDocument();
  });
});
