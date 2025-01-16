import { app, data, request } from 'tests/setup/setup';
import { auth } from '@routes';

app.use('/', auth);

describe('guest', () => {
  it('returns success', () => {
    return request(app)
      .get('/guest')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBeTruthy();
      });
  });
});
