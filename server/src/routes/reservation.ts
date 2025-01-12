import { Router } from 'express';
import * as reservation from '@controllers/reservation';
const router = Router();

router.post('/', reservation.post);
router.delete('/', reservation.remove);

export default router;
