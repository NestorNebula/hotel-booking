import styled from 'styled-components';

const Stay = styled.main`
  margin: 2.5rem;
  font-size: var(--fs-l);
  display: flex;
  flex-direction: column;

  & > * {
    padding: 1rem;
  }

  & > *:not(:last-child) {
    border-bottom: ${(props) => `1px solid ${props.theme.grey}`};
  }
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`;

export { Stay, Details };
