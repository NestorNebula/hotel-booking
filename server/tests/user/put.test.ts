import { app, data, request, setUser } from 'tests/setup/setup';
import { user } from '@routes';

setUser();
app.use('/', user);

describe('put', () => {
  it('returns updated user', () => {
    return request(app)
      .put(`/${data.users[0].id}`)
      .send({
        firstName: 'First',
        lastName: 'Last',
        email: 'thisemail@email.com',
      })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.firstName).toBe('First');
        expect(res.body.user.lastName).toBe('Last');
        expect(res.body.user.email).toBe('thisemail@email.com');
      });
  });

  it('returns success after updating password', () => {
    return request(app)
      .put(`/${data.users[0].id}?password`)
      .send({ password: data.users[0].password, newPassword: 'password' })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBeTruthy();
      });
  });

  it.only('returns 400 when actual password is wrong', (done) => {
    request(app)
      .put(`/${data.users[0].id}?password`)
      .send({ password: 'probably not this', newPassword: 'password' })
      .type('form')
      .expect(400, done);
  });

  it("returns 403 when trying to update someone else's data", (done) => {
    request(app)
      .put(`/${data.users[1].id}`)
      .send({ firstName: 'First', lastName: 'Last', email: 'this@email.com' })
      .type('form')
      .expect(403, done);
  });

  it('returns 400 when trying to update non-existent user', (done) => {
    request(app)
      .put(`/${data.users[0].id + 1}`)
      .send({ firstName: 'First', lastName: 'Last', email: 'this@email.com' })
      .type('form')
      .expect(400, done);
  });
});
