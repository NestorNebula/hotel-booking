import { ChangeEvent, useState } from 'react';
import type { validationChain } from '@services/validationChains';

export namespace useInput {
  export type value = string;

  export type updateValue = (e: ChangeEvent<HTMLInputElement>) => void;

  export type validation = {
    isValid: boolean;
    message: string;
  };
}

export type useInput = (
  validator: ReturnType<validationChain>,
  initialValue?: string
) => {
  value: useInput.value;
  updateValue: useInput.updateValue;
  validation: useInput.validation;
};

const useInput: useInput = (
  validator: ReturnType<validationChain>,
  initialValue?: string
) => {
  const [value, setValue] = useState(initialValue ?? '');
  const [validation, setValidation] = useState<useInput.validation>({
    isValid: true,
    message: '',
  });

  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    const beforeResult = validator.before(e.currentTarget.value);
    if (beforeResult.errors.length) {
      return;
    }
    setValue(beforeResult.value);
    const afterResult = validator.after(beforeResult.value);
    if (afterResult.errors.length) {
      setValidation({ isValid: false, message: afterResult.errors[0] });
    } else {
      setValidation({ isValid: true, message: '' });
    }
    return;
  };

  return { value, updateValue, validation };
};

export default useInput;
