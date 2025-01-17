import { app, data, request, setUser } from 'tests/setup/setup';
import { reservation } from '@routes';

setUser();
app.use('/', reservation);

describe('remove', () => {
  it('returns successfully removed reservation', () => {
    return request(app)
      .delete('/')
      .send({
        roomId: data.reservations[0].roomId,
        date: data.reservations[0].date,
      })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.reservation).toBeDefined();
      });
  });

  it('returns 400 when trying to remove a non-existent reservation', (done) => {
    request(app)
      .delete('/')
      .send({
        roomId: data.reservations[0].roomId,
        date: data.reservations[0].date,
      })
      .type('form')
      .expect(400, done);
  });

  it("returns 400 when trying to remove someone else's reservation", (done) => {
    request(app)
      .delete('/')
      .send({
        roomId: data.reservations[1].roomId,
        date: data.reservations[1].date,
      })
      .type('form')
      .expect(400, done);
  });

  it('returns 400 when trying to remove a reservation that is part of a stay', (done) => {
    request(app)
      .delete('/')
      .send({ roomId: data.stays[0].roomId, date: data.stays[0].firstDay })
      .type('form')
      .expect(400, done);
  });
});
