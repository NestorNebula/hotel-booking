import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  width: fit-content;

  & > div:first-child {
    text-transform: uppercase;
  }

  & > div.error {
    font-size: var(--fs-s);
    color: ${(props) => props.theme.red};
  }
`;

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.darkRed};
  color: ${(props) => props.theme.white};
  align-self: center;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
`;

export { Form, SubmitButton };
