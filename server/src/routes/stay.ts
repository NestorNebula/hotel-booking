import { Router } from 'express';
import * as stay from '@controllers/stay';
import { validateNewStay, validateStay } from '@utils/validators';
const router = Router();

router.get('/:stayId', stay.get);
router.post('/', validateNewStay, stay.post);
router.put('/:stayId', validateStay, stay.put);
router.delete('/stayId', stay.remove);

export default router;
