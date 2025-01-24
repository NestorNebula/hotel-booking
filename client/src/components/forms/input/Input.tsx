import type { useInput } from '@hooks/useInput';
import * as S from './Input.styles';
import { HTMLInputTypeAttribute } from 'react';

function Input({
  name,
  value,
  updateValue,
  validation,
  label = name,
  type = 'text',
  optional,
}: {
  name: string;
  value: useInput.value;
  updateValue: useInput.updateValue;
  validation: useInput.validation;
  label?: string;
  type?: HTMLInputTypeAttribute;
  optional?: boolean;
}) {
  return (
    <S.Container>
      <S.Input
        id={name}
        name={name}
        type={type}
        required={!optional}
        value={value}
        onChange={updateValue}
      />
      <S.Label htmlFor={name}>{label}</S.Label>
      {!validation.isValid && <S.Error>{validation.message}</S.Error>}
    </S.Container>
  );
}

export default Input;
