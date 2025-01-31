import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.theme.darkRed};
  color: ${(props) => props.theme.white};
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  box-shadow: ${(props) => `2px 2px 3px ${props.theme.darkGrey}`};
  position: relative;
  top: 0;
  transition: top 0.5s ease-out, filter 0.25s ease-in;

  &:hover {
    filter: brightness(125%);
  }

  &:active {
    top: 0.25rem;
  }
`;

export { Button };
