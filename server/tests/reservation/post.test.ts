import { app, data, request, setUser } from 'tests/setup/setup';
import { reservation } from '@routes';

setUser();
app.use('/', reservation);

describe('post', () => {
  it('returns reservation after creating it', () => {
    return request(app)
      .post('/')
      .send({ roomId: data.rooms[0].id, date: new Date(Date.now()) })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.reservation).toBeDefined();
      });
  });

  it('lets doing multiple reservations for different users on rooms having more than 1 as numberPerDay', () => {
    return request(app)
      .post('/')
      .send({ roomId: data.rooms[1].id, date: data.reservations[1].date })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(new Date(res.body.reservation.date).getDate()).toBe(
          data.reservations[1].date.getDate()
        );
      });
  });

  it('returns 403 when trying to book a room already booked on a specific day', (done) => {
    request(app)
      .post('/')
      .send({ roomId: data.rooms[2].id, date: data.reservations[2].date })
      .type('form')
      .expect(403, done);
  });

  it('returns 400 when trying to book a room already booked by the same user on the same day', () => {
    return request(app)
      .post('/')
      .send({ roomId: data.rooms[0].id, date: data.reservations[0].date })
      .type('form')
      .expect(400)
      .then((res) => {
        expect(res.body.error.msg).toMatch(
          /you already have booked this room/i
        );
      });
  });
});
