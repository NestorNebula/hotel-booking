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
    .notEmpty()
    .withMessage(errors.empty('Email'))
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
    .notEmpty()
    .withMessage(errors.empty('Password'))
    .isLength({ min: 8 })
    .withMessage(errors.minLength('Password', 8)),
];

const validateUpdatedUser = [
  body('firstName')
    .trim()
    .blacklist('<>/@_.&"();,:+=*%!?')
    .isLength({ max: 25 })
    .withMessage(errors.maxLength('First Name', 25))
    .optional(),
  body('lastName')
    .trim()
    .blacklist('<>/@_.&"();,:+=*%!?')
    .isLength({ max: 25 })
    .withMessage(errors.maxLength('Last Name', 25))
    .optional(),
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
    })
    .optional(),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage(errors.minLength('Password', 8))
    .optional(),
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
    .notEmpty()
    .withMessage(errors.empty('Date'))
    .custom((date: string) => {
      const stringToDate = new Date(date);
      if (typeof stringToDate.getDate() === 'number') {
        return true;
      }
      return false;
    })
    .withMessage(errors.type('Date', 'date')),
];

const validateAdminPassword = [body('password').blacklist('\\W')];

const validateNewStay = [
  body('firstDay')
    .notEmpty()
    .withMessage(errors.empty('First name'))
    .custom((firstDay: string) => {
      const firstDayToDate = new Date(firstDay);
      if (typeof firstDayToDate.getDate() === 'number') {
        return true;
      }
      return false;
    })
    .withMessage(errors.type('First day', 'date')),
  body('lastDay')
    .notEmpty()
    .withMessage(errors.empty('Last name'))
    .custom((lastDay: Date) => {
      const lastDayToDate = new Date(lastDay);
      if (typeof lastDayToDate.getDate() === 'number') {
        return true;
      }
      return false;
    })
    .withMessage(errors.type('Last day', 'date'))
    .custom((lastDay: Date, { req }) => {
      const firstDayToDate = new Date(req.body.firstDay);
      const lastDayToDate = new Date(lastDay);
      firstDayToDate.setUTCHours(0, 0, 0, 0);
      lastDayToDate.setUTCHours(0, 0, 0, 0);
      return firstDayToDate < lastDayToDate;
    })
    .withMessage('Stay must have a minimum of two nights.'),
  body('roomId')
    .notEmpty()
    .withMessage(errors.empty('RoomId'))
    .isNumeric()
    .withMessage(errors.type('RoomId', 'number')),
];

const validateStay = [
  body('firstDay')
    .notEmpty()
    .withMessage(errors.empty('First name'))
    .custom((firstDay: string) => {
      const firstDayToDate = new Date(firstDay);
      if (typeof firstDayToDate.getDate() === 'number') {
        return true;
      }
      return false;
    })
    .withMessage(errors.type('First day', 'date')),
  body('lastDay')
    .notEmpty()
    .withMessage(errors.empty('Last name'))
    .custom((lastDay: Date) => {
      const lastDayToDate = new Date(lastDay);
      if (typeof lastDayToDate.getDate() === 'number') {
        return true;
      }
      return false;
    })
    .withMessage(errors.type('Last day', 'date'))
    .custom((lastDay: Date, { req }) => {
      const firstDayToDate = new Date(req.body.firstDay);
      const lastDayToDate = new Date(lastDay);
      firstDayToDate.setUTCHours(0, 0, 0, 0);
      lastDayToDate.setUTCHours(0, 0, 0, 0);
      return firstDayToDate < lastDayToDate;
    })
    .withMessage('Stay must have a minimum of two nights.'),
];

export {
  validateNewUser,
  validateUpdatedUser,
  validateLoginData,
  validateAdminPassword,
  validateReservation,
  validateNewStay,
  validateStay,
};
