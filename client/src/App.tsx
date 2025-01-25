import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router';
import { Context } from '@context';
import Navbar from '@pages/app/navbar/Navbar';
import Sidebar from '@pages/app/sidebar/Sidebar';
import type { GuestUser, LoggedUser } from '@context/default';
import type { Room } from '#types/db';
import * as S from './App.styles';

function App() {
  const { rooms, user }: { rooms: Room[]; user: LoggedUser | GuestUser } =
    useLoaderData();
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const updateDisplaySidebar = () => {
    setDisplaySidebar(!displaySidebar);
  };

  return (
    <Context.Provider value={{ rooms, user }}>
      <S.App>
        <Navbar
          sidebarOpened={displaySidebar}
          updateSidebarDisplay={updateDisplaySidebar}
        />
        {displaySidebar && (
          <Sidebar close={updateDisplaySidebar} rooms={rooms} user={user} />
        )}
        <Outlet />
      </S.App>
    </Context.Provider>
  );
}

export default App;
