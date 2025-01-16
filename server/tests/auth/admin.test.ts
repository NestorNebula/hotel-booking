import { app, data, request } from 'tests/setup/setup';
import { auth } from '@routes';
import { getToken } from '@utils/jwt';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

app.use(cookieParser());
app.use('/', auth);

describe('admin', () => {
  it('returns success when user send the correct password', () => {
    return request(app)
      .post('/admin')
      .set('Cookie', [`token=${getToken(data.users[0].id, '15m')}`])
      .send({ password: process.env.ADMIN_PWD })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBeTruthy();
      });
  });

  it('returns 400 when sending wrong password', (done) => {
    request(app)
      .post('/admin')
      .set('Cookie', [`token=${getToken(data.users[0].id, '15m')}`])
      .send({ password: 'probably not this' })
      .type('form')
      .expect(400, done);
  });
});
