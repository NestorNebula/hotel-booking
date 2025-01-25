import { icon, menu } from '@assets/icons';
import * as S from './Navbar.styles';

function Navbar({
  sidebarOpened,
  updateSidebarDisplay,
}: {
  sidebarOpened: boolean;
  updateSidebarDisplay: () => void;
}) {
  return (
    <S.Navbar>
      <ul>
        <li>
          <S.SidebarButton
            aria-label={sidebarOpened ? 'close sidebar' : 'open sidebar'}
            onClick={updateSidebarDisplay}
          >
            <img src={menu} alt="menu" />
          </S.SidebarButton>
        </li>
        <li>
          <S.Logo src={icon} alt="" />
        </li>
      </ul>
    </S.Navbar>
  );
}

export default Navbar;
