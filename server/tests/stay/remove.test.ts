import { app, data, request, setUser } from 'tests/setup/setup';
import { stay } from '@routes';
import { getReservation } from '@models/queries';

setUser();
app.use('/', stay);

describe('remove', () => {
  it('returns removed stay', () => {
    return request(app)
      .delete(`/${data.stays[0].id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.stay).toBeDefined();
      });
  });

  it('delete stay associated reservations', async () => {
    const reservation = await getReservation(
      data.users[0].id,
      data.stays[0].roomId,
      data.stays[0].firstDay
    );
    expect(reservation).toBeNull();
  });

  it("returns 403 when trying to delete someone else's stay", (done) => {
    request(app).delete(`/${data.stays[1].id}`).expect(403, done);
  });

  it('returns 400 when trying to delete non-existent stay', (done) => {
    request(app).delete(`/${data.stays[0].id}`).expect(400, done);
  });
});
