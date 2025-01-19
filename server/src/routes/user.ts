import { Router } from 'express';
import * as user from '@controllers/user';
import { validateUpdatedUser } from '@utils/validators';
const router = Router();

router.get('/:userId', user.get);
router.put('/:userId', validateUpdatedUser, user.put);

export default router;
