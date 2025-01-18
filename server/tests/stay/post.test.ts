import { app, data, request, setUser } from 'tests/setup/setup';
import { stay } from '@routes';
import { faker } from '@faker-js/faker/.';

setUser();
app.use('/', stay);

describe('post', () => {
  it('returns stay after creating it', () => {
    const firstDay = faker.date.future();
    return request(app)
      .post('/')
      .send({
        firstDay,
        lastDay: faker.date.soon({ days: 10, refDate: firstDay }),
        roomId: data.rooms[0].id,
      })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.stay).toBeDefined();
      });
  });

  it('returns 400 when trying to book a stay that already exists', (done) => {
    request(app)
      .post('/')
      .send({
        firstDay: data.stays[0].firstDay,
        lastDay: data.stays[0].lastDay,
        roomId: data.stays[0].roomId,
      })
      .type('form')
      .expect(400, done);
  });

  it('returns 400 when trying to book a stay on a reservation that already exists', (done) => {
    request(app)
      .post('/')
      .send({
        firstDay: data.reservations[0].date,
        lastDay: faker.date.soon({
          days: 10,
          refDate: data.reservations[0].date,
        }),
        roomId: data.rooms[0].id,
      })
      .type('form')
      .expect(400, done);
  });

  it('lets user create stay on room that already have a stay but has multiple places per day', (done) => {
    request(app)
      .post('/')
      .send({
        firstDay: data.stays[1].firstDay,
        lastDay: data.stays[1].lastDay,
        roomId: data.stays[1].roomId,
      })
      .type('form')
      .expect(200, done);
  });

  it('returns 403 when trying to book a stay on a room that is already booked', (done) => {
    const firstDay = data.stays[2].firstDay;
    firstDay.setDate(data.stays[2].firstDay.getDate() + 1);
    const lastDay = data.stays[2].lastDay;
    lastDay.setDate(data.stays[2].lastDay.getDate() + 1);
    request(app)
      .post('/')
      .send({
        firstDay,
        lastDay,
        roomId: data.stays[2].roomId,
      })
      .type('form')
      .expect(403, done);
  });
});
