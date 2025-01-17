import { app, data, request, setUser } from 'tests/setup/setup';
import { room } from '@routes';

setUser();
app.use('/', room);

describe('get', () => {
  it('returns room', () => {
    return request(app)
      .get(`/${data.rooms[0].id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.room.id).toBe(data.rooms[0].id);
      });
  });

  it('returns room reservations when queried', () => {
    return request(app)
      .get(`/${data.rooms[0].id}?reservations`)
      .expect(200)
      .then((res) => {
        expect(res.body.room.reservations.length).not.toBeNull();
      });
  });

  it("returns 404 when the room doesn't exist", (done) => {
    request(app)
      .get(`/${data.rooms[0].id + 1}`)
      .expect(404, done);
  });
});
