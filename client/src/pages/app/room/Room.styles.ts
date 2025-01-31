import styled from 'styled-components';

const Room = styled.main`
  margin: 2.5rem;
  padding: 2.5rem;
  background-color: ${(props) => props.theme.grey};
  display: grid;
  grid-template-columns: 1fr 1fr;

  & > img {
    border-radius: 10px;
  }

  @media (min-width: 800px) {
    grid-template-columns: 0.75fr 1fr;
  }
`;
const Details = styled.div`
  font-size: var(--fs-m);
  place-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;

  & > div:first-child {
    font-size: var(--fs-l);
  }

  & > div:nth-of-type(2) {
    font-size: var(--fs-s);
  }
`;
const Description = styled.div`
  grid-column: 1 / 3;
  white-space: pre-wrap;
  font-size: var(--fs-m);
  padding-top: 2rem;
`;

export { Room, Details, Description };
