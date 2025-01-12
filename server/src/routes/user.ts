import { Router } from 'express';
import * as user from '@controllers/user';
const router = Router();

router.get('/:userId', user.get);
router.put('/:userId', user.put);

export default router;
