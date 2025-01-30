import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminForm from './AdminForm';

describe('AdminForm', () => {
  it('renders password field', () => {
    render(<AdminForm />);
    expect(screen.queryByLabelText(/admin password/i)).toBeInTheDocument();
  });
});
