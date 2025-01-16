import { app, data, request } from 'tests/setup/setup';
import { auth } from '@routes';
import cookieParser from 'cookie-parser';
import { getRefreshToken } from '@utils/jwt';

app.use(cookieParser());
app.use('/', auth);

describe('refresh', () => {
  it('returns success after refreshing cookie', () => {
    return request(app)
      .get('/refresh')
      .set('Cookie', [`refresh=${getRefreshToken(data.users[0].id, '7d')}`])
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBeTruthy();
      });
  });

  it('returns 400 when no refresh token is provided', (done) => {
    request(app).get('/refresh').expect(400, done);
  });
});
