import type { RequestUser } from './types';

declare global {
  namespace Express {
    export interface User extends RequestUser {}
  }
}
