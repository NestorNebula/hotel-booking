import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
const Input = styled.input<{ $valid: boolean }>`
  position: relative;
  top: 0;
  border: none;
  border-bottom: ${(props) =>
    props.$valid ? '2px solid black' : `2px solid ${props.theme.red}`};
  background-color: transparent;
  outline: none;
  transition: top 0.25s ease-in;

  &:placeholder-shown + label {
    top: 0.75rem;
    left: 0.5rem;
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    top: -2rem;
    left: 0;
  }

  &:focus {
    top: 0.5rem;
    border-bottom: ${(props) => `2px solid ${props.theme.brown}`};
  }
`;
const Label = styled.label`
  font-size: var(--fs-s);
  text-transform: capitalize;
  position: absolute;
  transition: top 0.25s ease-in, left 0.25s ease-in;
`;
const Error = styled.span`
  color: ${(props) => props.theme.red};
  font-size: var(--fs-s);
  max-width: 25ch;
`;

export { Container, Input, Label, Error };
