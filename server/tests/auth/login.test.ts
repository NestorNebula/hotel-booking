import { request, app, data } from 'tests/setup/setup';
import { auth } from '@routes';

app.use('/', auth);

describe('login', () => {
  it('returns success after successful login', () => {
    return request(app)
      .post('/login')
      .send({ email: data.users[0].email, password: data.users[0].password })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBeTruthy();
      });
  });

  it('returns 400 when trying to connect with a wrong password', (done) => {
    request(app)
      .post('/login')
      .send({ email: data.users[0].email, password: 'wrong password' })
      .type('form')
      .expect(400, done);
  });

  it('returns 400 when trying to access non-existent user', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'this@email.com', password: data.users[0].password })
      .type('form')
      .expect(400, done);
  });
});
