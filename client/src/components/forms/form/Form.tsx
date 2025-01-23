import { ReactElement } from 'react';
import * as S from './Form.styles';

function Form({
  submit,
  isValid,
  name,
  children,
}: {
  submit: () => Promise<any>;
  isValid: boolean;
  name?: string;
  children: ReactElement;
}) {
  return (
    <S.Form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      {children}
      <S.SubmitButton type={isValid ? 'submit' : 'button'}>
        {name ?? 'Submit'}
      </S.SubmitButton>
    </S.Form>
  );
}

export default Form;
