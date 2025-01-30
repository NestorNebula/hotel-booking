import styled from 'styled-components';

const App = styled.main<{ $sidebarOpened: boolean }>`
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  & > *:not(nav:last-of-type) {
    filter: ${(props) =>
      props.$sidebarOpened ? 'brightness(50%)' : 'brightness(100%)'};
  }
`;

export { App };
