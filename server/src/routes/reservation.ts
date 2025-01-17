import { Router } from 'express';
import * as reservation from '@controllers/reservation';
import { validateReservation } from '@utils/validators';
const router = Router();

router.post('/', validateReservation, reservation.post);
router.delete('/', validateReservation, reservation.remove);

export default router;
