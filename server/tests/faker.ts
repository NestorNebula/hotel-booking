import { faker } from '@faker-js/faker';
import { Reservation, Room, Stay, User } from '@prisma/client';

function getFakeReservation({
  userId,
  roomId,
}: {
  userId?: number;
  roomId?: number;
}): Reservation {
  return {
    userId: userId ?? faker.number.int(),
    roomId: roomId ?? faker.number.int(),
    date: faker.date.future({ years: 1 }),
    stayId: null,
  };
}

function getFakeRoom({ multiple }: { multiple: boolean }): Room {
  return {
    id: faker.number.int(),
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
  const firstDay = faker.date.future({ years: 1 });
  return {
    id: faker.number.int(),
    firstDay,
    lastDay: faker.date.soon({ days: 10 }),
    userId: userId ?? faker.number.int(),
    roomId: roomId ?? faker.number.int(),
  };
}

function getFakeUser(): User {
  const person = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
  return {
    id: faker.number.int(),
    firstName: person.firstName,
    lastName: person.lastName,
    email: faker.internet.email({
      firstName: person.firstName,
      lastName: person.lastName,
    }),
    password: faker.internet.password(),
    isAdmin: faker.datatype.boolean(),
  };
}

export { getFakeReservation, getFakeRoom, getFakeStay, getFakeUser };
