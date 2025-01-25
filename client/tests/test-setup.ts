import { beforeAll, afterEach, expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { getFakeRoom, getFakeUser } from '../src/services/tests/data';
import type { Room } from '../src/types/db';
expect.extend(matchers);

const mockRooms: Room[] = [];
const roomNumber = Math.ceil(Math.random() * 10);
for (let i = 0; i <= roomNumber; i++) {
  mockRooms.push(getFakeRoom({ multiple: i % 2 === 0 }));
}

beforeAll(() => {
  vi.mock('react', async () => {
    const actual = await vi.importActual('react');
    return {
      ...actual,
      useContext: () => {
        return {
          user: getFakeUser(),
        };
      },
    };
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
