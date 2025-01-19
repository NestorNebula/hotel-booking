import { app, data, request, setUser } from 'tests/setup/setup';
import { stay } from '@routes';
import { testingQueries } from '@models/queries';
import { faker } from '@faker-js/faker/.';

setUser();
app.use('/', stay);

describe('put', () => {
  it('returns updated extended stay', () => {
    const lastDay = data.stays[0].lastDay;
    lastDay.setDate(lastDay.getDate() + 1);
    return request(app)
      .put(`/${data.stays[0].id}`)
      .send({ firstDay: data.stays[0].firstDay, lastDay })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.stay).toBeDefined();
        expect(new Date(res.body.stay.lastDay).getTime()).toBe(
          lastDay.getTime()
        );
      });
  });

  it('returns updated shortened stay', () => {
    return request(app)
      .put(`/${data.stays[0].id}`)
      .send({
        firstDay: data.stays[0].firstDay,
        lastDay: data.stays[0].lastDay,
      })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.stay).toBeDefined();
        expect(new Date(res.body.stay.lastDay).getTime()).toBe(
          data.stays[0].lastDay.getTime()
        );
      });
  });

  it("returns 403 when trying to extends stay on a day that doesn't have any room left", async () => {
    const reservationDate = new Date(data.stays[0].firstDay.toJSON());
    reservationDate.setDate(reservationDate.getDate() - 1);
    await testingQueries.__createTestReservation({
      userId: data.users[1].id,
      roomId: data.stays[0].roomId,
      date: reservationDate,
      stayId: null,
    });
    return request(app)
      .put(`/${data.stays[0].id}`)
      .send({ firstDay: reservationDate, lastDay: data.stays[0].lastDay })
      .type('form')
      .expect(403);
  });

  it('returns 400 when completely changing dates between existing stay and new stay', (done) => {
    const firstDay = faker.date.future();
    request(app)
      .put(`/${data.stays[0].id}`)
      .send({
        firstDay,
        lastDay: faker.date.soon({ days: 10, refDate: firstDay }),
      })
      .type('form')
      .expect(400, done);
  });

  it("returns 403 when trying to change someone else's stay", (done) => {
    request(app)
      .put(`/${data.stays[1].id}`)
      .send({
        firstDay: data.stays[1].firstDay,
        lastDay: data.stays[1].lastDay,
      })
      .type('form')
      .expect(403, done);
  });
});
