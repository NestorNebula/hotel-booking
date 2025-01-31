import styled, { keyframes } from 'styled-components';

const sidebarAnimation = keyframes`
from {
  left: -25rem;
}
to {
  left: 0;
}
`;

const Sidebar = styled.nav`
  position: fixed;
  z-index: 1;
  min-height: 100vh;
  background-color: ${(props) => props.theme.brown};
  color: ${(props) => props.theme.white};
  padding: 1.5rem 3rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;

  animation: ${sidebarAnimation} 0.5s ease-out forwards;

  & ul {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    gap: 1.25rem;
  }

  & > ul {
    font-size: var(--fs-m);
    gap: 2.5rem;
  }

  & > footer {
    font-size: var(--fs-s);
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    max-width: 30ch;
    text-align: center;

    & > div {
      display: flex;
      gap: 0.25rem;
      align-items: center;
    }

    & img {
      width: 2.5rem;
    }
  }
`;
const CloseButton = styled.button`
  position: absolute;
  right: 1.5rem;

  & > img {
    width: 2.5rem;
    filter: invert();
  }
`;
const Link = styled.a`
  position: relative;
  width: fit-content;
  white-space: nowrap;

  &::after {
    position: absolute;
    left: 0;
    bottom: -0.25rem;
    content: '';
    width: 100%;
    border-bottom: 0px transparent;
    transition: all 0.25s ease-in;
  }
  &:hover::after {
    border-bottom: ${(props) => `1px solid ${props.theme.white}`};
  }
`;
const RoomList = styled.ul`
  font-size: var(--fs-s);
`;

export { Sidebar, CloseButton, Link, RoomList };
