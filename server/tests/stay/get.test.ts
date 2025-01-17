import { app, data, request, setUser } from 'tests/setup/setup';
import { stay } from '@routes';

setUser();
app.use('/', stay);

describe('get', () => {
  it('returns existing stay', () => {
    return request(app)
      .get(`/${data.stays[0].id}`)
      .then((res) => {
        expect(res.body.stay.id).toBe(data.stays[0].id);
      });
  });

  it("returns 403 when trying to access someone else's stay", (done) => {
    request(app).get(`/${data.stays[1].id}`).expect(403, done);
  });

  it('returns 404 when trying to access non-existent stay', (done) => {
    request(app)
      .get(`/${data.stays[0].id + 1}`)
      .expect(404, done);
  });
});
