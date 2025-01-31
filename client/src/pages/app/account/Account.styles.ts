import styled from 'styled-components';

const Account = styled.main`
  font-size: var(--fs-m);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 1rem;

  & > div:first-child {
    font-size: var(--fs-l);
  }
`;
const Infos = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  background-color: ${(props) => props.theme.grey};
  width: fit-content;
  align-self: center;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: ${(props) => `0px 0px 5px ${props.theme.darkGrey}`};

  & > * {
    width: fit-content;
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const CloseButton = styled.button`
  position: relative;
  left: 10rem;

  & > img {
    width: 3rem;
  }
`;
const Reservations = styled.section`
  margin-top: 5rem;

  & > div:first-child {
    font-size: var(--fs-l);
  }
`;

export { Account, Infos, Buttons, CloseButton, Reservations };
