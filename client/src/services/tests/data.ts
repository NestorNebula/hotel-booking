import { faker } from '@faker-js/faker';
import type { Reservation, Room, Stay, User } from '#types/db';

function getFakeReservation({
  userId,
  roomId,
  date,
}: {
  userId?: number;
  roomId?: number;
  date?: Date;
}): Reservation {
  return {
    userId: userId ?? faker.number.int({ max: 1000000 }),
    roomId: roomId ?? faker.number.int({ max: 1000000 }),
    date:
      date ?? new Date(faker.date.future({ years: 1 }).setUTCHours(0, 0, 0, 0)),
    stayId: null,
  };
}

function getFakeRoom({ multiple }: { multiple: boolean }): Room {
  return {
    id: faker.number.int({ max: 1000000 }),
    name: faker.lorem.words({ min: 1, max: 3 }),
    description: faker.lorem.paragraphs({ min: 1, max: 3 }),
    images: [],
    pricePerDay: Number(faker.commerce.price()),
    numberPerDay: multiple ? 2 : 1,
  };
}

function getFakeStay({
  userId,
  roomId,
}: {
  userId?: number;
  roomId?: number;
}): Stay {
  const firstDay = new Date(
    faker.date.future({ years: 1 }).setUTCHours(0, 0, 0, 0)
  );
  let lastDay = new Date(
    faker.date.soon({ days: 10, refDate: firstDay }).setUTCHours(0, 0, 0, 0)
  );
  while (firstDay.getTime() >= lastDay.getTime()) {
    lastDay = new Date(
      faker.date.soon({ days: 10, refDate: firstDay }).setUTCHours(0, 0, 0, 0)
    );
  }
  return {
    id: faker.number.int({ max: 1000000 }),
    firstDay,
    lastDay,
    userId: userId ?? faker.number.int({ max: 1000000 }),
    roomId: roomId ?? faker.number.int({ max: 1000000 }),
  };
}

function getFakeStayReservations({ stay }: { stay: Stay }): Reservation[] {
  const reservations: Reservation[] = [];
  const actualDay = new Date(stay.firstDay.toJSON());
  while (actualDay <= stay.lastDay) {
    reservations.push(
      getFakeReservation({
        userId: stay.userId,
        roomId: stay.roomId,
        date: new Date(actualDay.toJSON()),
      })
    );
    actualDay.setDate(actualDay.getDate() + 1);
  }
  return reservations;
}

function getFakeUser(): User {
  const person = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
  return {
    id: faker.number.int({ max: 1000000 }),
    firstName: person.firstName,
    lastName: person.lastName,
    email: faker.internet.email({
      firstName: person.firstName,
      lastName: person.lastName,
    }),
    isAdmin: faker.datatype.boolean(),
  };
}

export {
  getFakeReservation,
  getFakeRoom,
  getFakeStay,
  getFakeStayReservations,
  getFakeUser,
};
