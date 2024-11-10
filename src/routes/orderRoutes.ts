import { Router } from 'express';
import { createorder,updateorder,deleteorder,getorderById,getAllorders } from '../controllers/ordercontroller';

const router = Router();

router.post('/create', createorder);
router.post('/update', updateorder);
router.post('/delete', deleteorder);
router.post('/getById', getorderById);
router.post('/getAll', getAllorders);

export default router;