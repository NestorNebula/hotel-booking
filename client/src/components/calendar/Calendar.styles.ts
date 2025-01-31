import styled from 'styled-components';

const Calendar = styled.section`
  font-size: var(--fs-l);
  display: grid;
  justify-self: center;
  width: fit-content;
  place-items: center;
  gap: 2.5rem;
  border: ${(props) => `5px solid ${props.theme.darkRed}`};
  border-radius: 10px;
  box-shadow: ${(props) => `0px 0px 10px ${props.theme.darkGrey}`};
  padding: 2rem;
  margin: 2rem 1rem;
`;
const Header = styled.header`
  display: flex;
  gap: 2rem;
  margin-top: 2.5rem;
`;
const ArrowButton = styled.button`
  & > img {
    width: 2.5rem;
  }

  &:disabled {
    opacity: 0.25;
  }

  @media (min-width: 800px) {
    & > img {
      width: 4rem;
    }
  }
`;
const Week = styled.div`
  display: flex;
  gap: 0.5rem;

  & > * {
    width: 5rem;
    height: 5rem;
    border-radius: 5rem;
  }

  @media (min-width: 800px) {
    & > * {
      width: 10rem;
      height: 10rem;
      border-radius: 10rem;
    }
  }
`;
const Day = styled.button<{ $firstDay?: boolean; $lastDay?: boolean }>`
  background-color: ${(props) =>
    props.$firstDay
      ? props.theme.lightBlue
      : props.$lastDay
      ? props.theme.red
      : props.theme.white};
  opacity: 1;
  transition: background-color 0.5s ease-in, color 0.5s ease-in;

  &:disabled {
    color: ${(props) =>
      props.$firstDay || props.$lastDay ? props.theme.white : props.theme.grey};
  }
`;
const EmptyDay = styled.div``;

export { Calendar, Header, ArrowButton, Week, Day, EmptyDay };
