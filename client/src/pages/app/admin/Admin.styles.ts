import styled from 'styled-components';

const Admin = styled.main`
  margin: 1rem;

  & > button {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-right: 5rem;

    & > img {
      width: 3rem;
    }
  }

  & > form {
    margin: 5rem;
    font-size: var(--fs-m);
    justify-self: center;
  }
`;

export { Admin };
