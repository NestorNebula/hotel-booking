namespace User {
  export type WithReservations = User & { reservations: Reservation[] };

  export type WithStays = User & { stays: Stay[] };
}

namespace Room {
  export type WithReservations = Room & { reservations: Reservation[] };

  export type WithStays = Room & { stays: Stay[] };
}

namespace Reservation {
  export type WithUser = Reservation & { user: User };

  export type WithRoom = Reservation & { room: Room };

  export type WithStay = Reservation & { stayId: number; stay: Stay };
}

namespace Stay {
  export type WithUser = Stay & { user: User };

  export type WithRoom = Stay & { room: Room };

  export type WithReservations = Stay & { reservations: Reservation };
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

interface Room {
  id: number;
  name: string;
  description: string;
  images: string[];
  pricePerDay: number;
  numberPerDay: number;
}

interface Reservation {
  userId: number;
  roomId: number;
  date: Date;
  stayId: null;
}

interface Stay {
  id: number;
  firstDay: Date;
  lastDay: Date;
  userId: number;
  roomId: number;
}

export type { User, Room, Reservation, Stay };
