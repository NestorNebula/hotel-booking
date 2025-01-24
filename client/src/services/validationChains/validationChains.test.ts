import { describe, expect, it } from 'vitest';
import { name, email, password } from '.';

describe('Name', () => {
  it('returns no error when typing correct name', () => {
    const value = 'Name';
    expect(name().before(value).errors).toHaveLength(0);
    expect(name().after(value).errors).toHaveLength(0);
  });

  it('returns errors when typing incorrect name', () => {
    const value = 'Name too long with number 3';
    expect(name().before(value).errors).toHaveLength(2);
    expect(name().after('').errors).toHaveLength(1);
  });
});

describe('Email', () => {
  it('returns no error when typing correct email', () => {
    const value = 'this@email.com';
    expect(email().before(value).errors).toHaveLength(0);
    expect(email().after(value).errors).toHaveLength(0);
  });

  it('returns errors when typing incorrect email', () => {
    const value = 'notacorrectemail';
    expect(email().after(value).errors).toHaveLength(1);
    expect(email().after('').errors).toHaveLength(2);
  });
});

describe('Password', () => {
  it('returns no error when typing correct password', () => {
    const value = 'password';
    expect(password().after(value).errors).toHaveLength(0);
  });

  it('returns errors when typing incorrect password', () => {
    const value = 'pwd';
    expect(password().after(value).errors).toHaveLength(1);
    expect(password().after('').errors).toHaveLength(2);
  });
});
