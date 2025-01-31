import styled from 'styled-components';

const ReservationOverview = styled.section`
  font-size: var(--fs-m);
  margin: 2.5rem;
  padding: 2.5rem;
  background-color: ${(props) => props.theme.grey};
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;

  & > img {
    grid-row: 1 / 3;
    border-radius: 10px;
  }

  @media (min-width: 800px) {
    grid-template-columns: 0.75fr 1fr;
  }
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  padding: 0 1rem;

  & > div:first-child {
    font-size: var(--fs-l);
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  height: fit-content;
`;

export { ReservationOverview, Details, Buttons };
