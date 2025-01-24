import validate from '../validate';
import type { result } from '../validate';

type validationChain = (fieldName?: string) => {
  before: (fieldValue: string) => result;
  after: (fieldValue: string) => result;
};

const name: validationChain = (fieldName) => {
  return {
    before: (fieldValue) =>
      validate(fieldName || 'Name', fieldValue)
        .isLength({ max: 25 })
        .isFormat(new RegExp('^[a-z ]*$', 'i'))
        .result(),
    after: (fieldValue) =>
      validate(fieldName || 'Name', fieldValue)
        .notEmpty()
        .result(),
  };
};

const email: validationChain = () => {
  return {
    before: (fieldValue) =>
      validate('Email', fieldValue)
        .isLength({ max: 255 })
        .toLowerCase()
        .result(),
    after: (fieldValue) =>
      validate('Email', fieldValue)
        .notEmpty()
        .isFormat(new RegExp('^[\\w-.]+@[\\w-]+\\.[\\w-]{2,4}$'))
        .result(),
  };
};

const password: validationChain = (fieldName) => {
  return {
    before: (fieldValue) =>
      validate(fieldName || 'Password', fieldValue).result(),
    after: (fieldValue) =>
      validate(fieldName || 'Password', fieldValue)
        .notEmpty()
        .isLength({ min: 8, max: 255 })
        .result(),
  };
};

export { name, email, password };
