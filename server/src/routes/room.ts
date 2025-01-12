import { Router } from 'express';
import * as room from '@controllers/room';
const router = Router();

router.get('/:roomId', room.get);
router.get('/', room.getAll);

export default router;
