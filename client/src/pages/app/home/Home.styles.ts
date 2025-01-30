import styled from 'styled-components';

const Home = styled.main`
  font-size: var(--fs-m);
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem 2rem;

  & > div:first-child {
    font-size: var(--fs-l);
  }
`;
const RoomList = styled.section`
  padding: 1rem 5rem 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 1fr;
  gap: 5rem;
`;

export { Home, Header, RoomList };
