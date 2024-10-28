import { Router } from 'express';
import { getUserById,getUserByUsername,getUsersByRole,createUser,updateUser,deleteUser } from '../controllers/userController.ts';

const router = Router();

router.post('/createUser', createUser);
router.post('/getByID', getUserById);
router.post('/getByName', getUserByUsername);
router.post('/getByRole', getUsersByRole);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);


export default router;