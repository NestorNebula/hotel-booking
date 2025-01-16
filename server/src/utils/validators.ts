import { body } from 'express-validator';
import { query, getUserByEmail } from '@models/queries';

const errors = {
  empty: (fieldName: string) => {
    return `${fieldName} cannot be empty.`;
  },
  format: (fieldName: string, example: string) => {
    return `${fieldName} must be in correct format. (${example})`;
  },
  maxLength: (fieldName: string, max: number) => {
    return `${fieldName} cannot have more than ${max} characters.`;
  },
  minLength: (fieldName: string, min: number) => {
    return `${fieldName} must have at least ${min} characters.`;
  },
  type: (fieldName: string, type: string) => {
    return `${fieldName} must be a ${type}.`;
  },
};

const validateNewUser = [
  body('firstName')
    .trim()
    .blacklist('<>/@_.&"();,:+=*%!?')
    .isLength({ max: 25 })
    .withMessage(errors.maxLength('First Name', 25))
    .notEmpty()
    .withMessage(errors.empty('First Name')),
  body('lastName')
    .trim()
    .blacklist('<>/@_.&"();,:+=*%!?')
    .isLength({ max: 25 })
    .withMessage(errors.maxLength('Last Name', 25))
    .notEmpty()
    .withMessage(errors.empty('Last Name')),
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

const validateLoginData = [
  body('email')
    .isEmail()
    .withMessage(errors.format('Email', 'valid@email.com')),
  body('password')
    .isLength({ min: 8 })
    .withMessage(errors.minLength('Password', 8)),
];

const validateReservation = [
  body('roomId')
    .isNumeric()
    .withMessage(errors.type('RoomId', 'number'))
    .notEmpty()
    .withMessage(errors.empty('RoomId')),
  body('date')
    .isDate()
    .withMessage(errors.type('Date', 'date'))
    .notEmpty()
    .withMessage(errors.empty('Date')),
];

const validateAdminPassword = [body('password').blacklist('\\W')];

export {
  validateNewUser,
  validateLoginData,
  validateAdminPassword,
  validateReservation,
};
