import type { Reservation, Room } from '@prisma/client';

const getStayReservations: (
  userId: number,
  roomId: number,
  firstDay: Date,
  lastDay: Date
) => Omit<Reservation, 'stayId'>[] = (userId, roomId, firstDay, lastDay) => {
  const stayReservations: Omit<Reservation, 'stayId'>[] = [];
  const iteratingDay = new Date(firstDay.toJSON());
  while (iteratingDay <= lastDay) {
    stayReservations.push({
      userId,
      roomId,
      date: new Date(iteratingDay.toJSON()),
    });
    iteratingDay.setDate(iteratingDay.getDate() + 1);
  }
  return stayReservations;
};

const checkRoomAvailability = (
  existingReservations: Reservation[],
  newReservations: Omit<Reservation, 'stayId'>[],
  room: Room
) => {
  let available = true;
  for (let i = 0; i < newReservations.length; i++) {
    const dayReservations = existingReservations.filter(
      (r) => r.date.getTime() === newReservations[i].date.getTime()
    );
    if (dayReservations.length >= room.numberPerDay) {
      available = false;
      return available;
    }
  }
  return available;
};

export { getStayReservations, checkRoomAvailability };
