import { Router } from 'express';
import * as auth from '@controllers/auth';
import {
  validateNewUser,
  validateLoginData,
  validateAdminPassword,
} from '@utils/validators';
import passport from 'passport';
import '@utils/passport/strategy';
import { handleError } from '@utils/passport/fail';
const router = Router();

router.post('/signup', validateNewUser, auth.signup);
router.post('/login', validateLoginData, auth.login);
router.get('/guest', auth.guest);
router.get('/refresh', auth.refresh);
router.post(
  '/admin',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  handleError,
  validateAdminPassword,
  auth.admin
);

export default router;
