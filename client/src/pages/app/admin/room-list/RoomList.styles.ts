import styled from 'styled-components';

const RoomList = styled.section`
  font-size: var(--fs-m);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 5rem;
`;
const Room = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 0.5rem;
  align-items: center;
  background-color: ${(props) => props.theme.darkGrey};
  color: ${(props) => props.theme.white};
  padding: 2rem;
  border-radius: 10px;

  & > img {
    height: clamp(5rem, 15vw, 40rem);
    width: clamp(5rem, 15vw, 40rem);
    object-fit: cover;
    border-radius: 15px;
  }

  & > div {
    justify-self: center;
  }

  & > button {
    justify-self: end;
    height: fit-content;
    width: fit-content;
  }

  @media (min-width: 600px) {
    grid-template-columns: auto 0.5fr 1fr;
  }
`;

export { RoomList, Room };
