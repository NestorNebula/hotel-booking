import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from './Home';

beforeEach(() => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
});

describe('Home', () => {
  it('renders all rooms', () => {
    expect(
      screen.queryAllByRole('button', { name: /access to room/i }).length
    ).toBeGreaterThanOrEqual(1);
  });
});
