import { app, data, request, setUser } from 'tests/setup/setup';
import { room } from '@routes';

setUser();
app.use('/', room);

describe('getAll', () => {
  it('returns all rooms', () => {
    return request(app)
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.body.rooms).toHaveLength(data.rooms.length);
      });
  });

  it('returns rooms reservations when queried and when user is admin', () => {
    return request(app)
      .get('/?reservations')
      .expect(200)
      .then((res) => {
        if (data.users[0].isAdmin) {
          expect(res.body.rooms[0].reservations).toBeDefined();
        } else {
          expect(res.body.rooms[0].reservations).toBeUndefined();
        }
      });
  });
});
