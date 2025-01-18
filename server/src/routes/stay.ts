import { Router } from 'express';
import * as stay from '@controllers/stay';
import { validateStay } from '@utils/validators';
const router = Router();

router.get('/:stayId', stay.get);
router.post('/', validateStay, stay.post);
router.put('/:stayId', stay.put);
router.delete('/stayId', stay.remove);

export default router;
