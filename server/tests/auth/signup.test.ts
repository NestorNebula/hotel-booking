import { request, app, data } from 'tests/setup/setup';
import { auth } from '@routes';

app.use('/', auth);

describe('signup', () => {
  it('returns success after creating user', () => {
    return request(app)
      .post('/signup')
      .send({
        firstName: data.users[0].firstName,
        lastName: data.users[1].lastName,
        email: 'this@email.com',
        password: 'password',
      })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBeTruthy();
      });
  });

  it('returns 409 when email is already taken', (done) => {
    request(app)
      .post('/signup')
      .send({
        firstName: data.users[0].firstName,
        lastName: data.users[1].lastName,
        email: data.users[0].email,
        password: 'password',
      })
      .type('form')
      .expect(409, done);
  });

  it("returns 400 when forms isn't submitted correctly", () => {
    return request(app)
      .post('/signup')
      .send({
        firstName: 'not acceptable as a first name',
        lastName: 'not acceptable as a last name',
        email: 'notanemail',
        password: 'pwd',
      })
      .type('form')
      .expect(400)
      .then((res) => {
        expect(res.body.errors).toHaveLength(4);
      });
  });
});
