import { Router } from 'express';
import * as auth from '@controllers/auth';
const router = Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/guest', auth.guest);
router.get('/refresh', auth.refresh);
router.post('/admin', auth.admin);

export default router;
