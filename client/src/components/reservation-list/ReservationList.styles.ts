import styled from 'styled-components';

const ReservationList = styled.section`
  display: grid;
  gap: 2rem;
`;
const Reservation = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: var(--fs-m);
  margin-left: 1.5rem;
`;

export { ReservationList, Reservation, Title };
