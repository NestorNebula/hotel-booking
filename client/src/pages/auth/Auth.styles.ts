import styled from 'styled-components';

const Auth = styled.main`
  font-size: var(--fs-m);
  min-height: 100vh;

  & > img {
    overflow: hidden;
    position: fixed;
    inset: 0;
    height: 100vh;
    width: 100vw;
    object-fit: cover;
    z-index: -1;
    filter: blur(10px) opacity(30%);
  }

  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
`;
const Title = styled.div`
  font-size: var(--fs-l);
  grid-column: 1 / 3;
`;
const Guest = styled.button`
  grid-column: 1 / 3;
  background-color: ${(props) => props.theme.darkGrey};
  color: ${(props) => props.theme.white};
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
`;

export { Auth, Title, Guest };
