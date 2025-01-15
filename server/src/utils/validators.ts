import { body } from 'express-validator';
import { query, getUserByEmail } from '@models/queries';

const errors = {
  format: (fieldName: string, example: string) => {
    return `${fieldName} must be in correct format. (${example})`;
  },
  maxLength: (fieldName: string, max: number) => {
    return `${fieldName} cannot have more than ${max} characters.`;
  },
  minLength: (fieldName: string, min: number) => {
    return `${fieldName} must have at least ${min} characters.`;
  },
};

const validateNewUser = [
  body('firstName')
    .trim()
    .blacklist('<>/@_.&"();,:+=*%!?')
    .isLength({ max: 25 })
    .withMessage(errors.maxLength('First Name', 25)),
  body('lastName')
    .trim()
    .blacklist('<>/@_.&"();,:+=*%!?')
    .isLength({ max: 25 })
    .withMessage(errors.maxLength('Last Name', 25)),
  body('email')
    .isEmail()
    .withMessage(errors.format('Email', 'valid@email.com'))
    .normalizeEmail()
    .custom(async (email) => {
      const { result, error } = await query(() => getUserByEmail(email));
      if (error) {
        throw new Error('Error during email availability check.');
      } else if (result) {
        throw new Error('Email already taken.');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage(errors.minLength('Password', 8)),
];

export { validateNewUser };
