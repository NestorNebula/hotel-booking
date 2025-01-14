import type { Reservation, Room, Stay, User } from '@prisma/client';
import { query, testingQueries } from '@models/queries';
import {
  getFakeReservation,
  getFakeRoom,
  getFakeStay,
  getFakeUser,
} from './faker';
import type { Model } from '@utils/types';

interface Status {
  dataPopulated: boolean;
  attempts: number;
  error: boolean | null;
}

const getData: () => {
  reservations: Reservation[];
  rooms: Room[];
  stays: Stay[];
  users: User[];
} = () => {
  const rooms = [
    getFakeRoom({ multiple: false }),
    getFakeRoom({ multiple: true }),
    getFakeRoom({ multiple: false }),
  ];
  const users = [getFakeUser(), getFakeUser(), getFakeUser()];
  const stays = users.map((user, index) =>
    getFakeStay({ userId: user.id, roomId: rooms[index].id })
  );
  const reservations = users.map((user, index) =>
    getFakeReservation({ userId: user.id, roomId: rooms[index].id })
  );
  return { reservations, rooms, stays, users };
};

const populateDataModel = async <Data extends Model>(
  data: Data[],
  status: Status,
  queryCb: (arg: Data) => Promise<void>
) => {
  for (let i = 0; i < data.length; i++) {
    const result = await query(() => queryCb(data[i]));
    if (result.error) {
      status.error = true;
      break;
    }
  }
};

const populateDb = async () => {
  const status: Status = {
    dataPopulated: false,
    attempts: 0,
    error: null,
  };
  while (!status.dataPopulated && status.attempts < 10) {
    status.attempts += 1;
    status.error = null;
    const dbEmptied = await emptyDb();
    if (!dbEmptied) continue;
    const data = getData();
    await populateDataModel(
      data.users,
      status,
      testingQueries.__createTestUser
    );
    if (status.error) continue;
    await populateDataModel(
      data.rooms,
      status,
      testingQueries.__createTestRoom
    );
    if (status.error) continue;
    await populateDataModel(
      data.reservations,
      status,
      testingQueries.__createTestReservation
    );
    if (status.error) continue;
    const stays: (Stay & { reservations: Reservation[] })[] = [];
    for (let i = 0; i < data.stays.length; i++) {
      const stay = data.stays[i];
      const reservations: Reservation[] = [];
      const currentDate = stay.firstDay;
      while (currentDate <= stay.lastDay) {
        reservations.push({
          userId: stay.userId,
          roomId: stay.roomId,
          date: currentDate,
          stayId: stay.id,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      await populateDataModel(
        reservations,
        status,
        testingQueries.__createTestReservation
      );
      if (status.error) break;
      stays.push({ ...stay, reservations });
    }
    if (status.error) continue;
    await populateDataModel(stays, status, testingQueries.__createTestStay);
    if (status.error) continue;
    status.dataPopulated = true;
  }
  return status.dataPopulated;
};

const emptyDb = async () => {
  const result = await query(testingQueries.__emptyTestDb);
  return !result.error;
};

export { getData, populateDb, emptyDb };
