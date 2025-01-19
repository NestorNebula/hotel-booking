import { app, data, request, setUser } from 'tests/setup/setup';
import { user } from '@routes';

setUser();
app.use('/', user);

describe('get', () => {
  it('returns user', () => {
    return request(app)
      .get(`/${data.users[0].id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.id).toBe(data.users[0].id);
      });
  });

  it('returns user with reservations', () => {
    return request(app)
      .get(`/${data.users[0].id}?reservations`)
      .expect(200)
      .then((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.reservations).toBeDefined();
      });
  });

  it('returns 403 when trying to access another user', (done) => {
    request(app).get(`/${data.users[1].id}`).expect(403, done);
  });

  it('returns 404 when trying to access non-existent user', (done) => {
    request(app)
      .get(`/${data.users[0].id + 1}`)
      .expect(404, done);
  });
});
