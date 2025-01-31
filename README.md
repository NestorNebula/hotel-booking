<a id="top"></a>

<div align="center">
    <a href="https://github.com/NestorNebula/hotel-booking">
        <img src="./client/public/icons/icon.png" alt="Project Logo" width="100" height="100" />
    </a>
    
<h3>Hotel Booking</h3>
</div>

## About

![App Screenshot](./client/public/images/hotel-booking.png)

This project is an application for reserving rooms in an imaginary hotel.

A user, once connected, can create reservation for every room of the hotel. Some rooms supports multiple reservations for the same night while others only allows one reservation per night.

The user can reserve each room for one or multiple nights and has the possibility to update its stay or to delete it.

An admin page also exists, allowing admin to have to each room reservations.

### Built With

[![React](https://skillicons.dev/icons?i=react&theme=light)](https://react.dev/)
[![Typescript](https://skillicons.dev/icons?i=typescript)](https://www.typescriptlang.org/)
[![Vite](https://skillicons.dev/icons?i=vite&theme=light)](https://vite.dev/)
[![Vitest](https://skillicons.dev/icons?i=vitest&theme=light)](https://vitest.dev/)
[![NodeJS](https://skillicons.dev/icons?i=nodejs&theme=light)](https://nodejs.org/)
[![Express](https://skillicons.dev/icons?i=express&theme=light)](https://expressjs.com/)
[![PostgreSQL](https://skillicons.dev/icons?i=postgresql&theme=light)](https://www.postgresql.org/)
[![Prisma](https://skillicons.dev/icons?i=prisma)](https://www.prisma.io/)
[![Jest](https://skillicons.dev/icons?i=jest)](https://jestjs.io/)

#### AND

[![Passport](https://img.shields.io/badge/-Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)](https://www.passportjs.org/)
[![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)
[![JWT](https://img.shields.io/badge/-JWT-000?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white)](https://jwt.io/)

## Getting Started

### Prerequisites

- NPM
- PostgreSQL database

### Installation

1. Fork the [Project repository](https://github.com/NestorNebula/hotel-booking)
2. Clone the forked repository to your local machine
   ```
   git clone git@github.com:<your username>/<repo name>.git
   ```
3. Update remote URL

   ```
   # SSH:
   git remote add upstream git@github.com:hotel-booking/<repo name>.git

   # HTTPS:
   git remote add upstream https://github.com/hotel-booking/<repo name>.git
   ```

4. Go to the server directory
   ```
   cd server
   ```
5. Create a .env file with the following keys

   ```
   // PostgreSQL DB
   DATABASE_URL
   TEST_DATABASE_URL (another DB, needed for testing)

   // JWT Secrets
   T=<secret>
   R=<secret>

   // Admin Password (for users to become admin)
   ADMIN_PWD=<password>

   PORT=<PORT>
   CLIENT_URL=<client_url>
   ```

6. Install required packages
   ```
   npm install
   ```
7. Go to the client directory and repeat the same process, this time with this key
   ```
   VITE_API_URL=<your_api_url>
   ```
8. Open the server and the client in development mode with this command in each directory
   ```
   npm run dev
   ```

If an error occurs, make sure you have done everything properly according to this guide. If you think so, you can <a href="https://github.com/NestorNebula/hotel-booking/issues">Open an Issue</a>.

## Contributing

If you find an issue within the app or want to contribute, you can <a href="https://github.com/NestorNebula/hotel-booking/issues">Open an Issue</a>.

## License

[![MIT License](https://img.shields.io/badge/License-MIT-darkcyan.svg?style=for-the-badge)](https://github.com/NestorNebula/hotel-booking/blob/main/LICENSE)

## Contact

Noa Houssier

- [Github](https://github.com/NestorNebula)
- [Linkedin](https://www.linkedin.com/in/noahoussier)

## Acknoledgements

- [Material Design Icons](https://pictogrammers.com/library/mdi/)
- [Faker](https://fakerjs.dev/)
- [Supertest](https://github.com/ladjs/supertest)
- [date-fns](https://date-fns.org/)

<p align='right'>(<a href='#top'>go back to the top</a>)</p>
