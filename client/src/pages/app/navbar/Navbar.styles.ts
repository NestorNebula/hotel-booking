import styled from 'styled-components';

const Navbar = styled.nav`
  padding: 1rem 3rem;

  & > ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const SidebarButton = styled.button`
  & > img {
    width: 5rem;
  }
`;
const Logo = styled.img`
  width: 7.5rem;

  @media (min-width: 800px) {
    width: 10rem;
  }
`;

export { Navbar, SidebarButton, Logo };
