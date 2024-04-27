import { Router } from 'express'
import { createUserController } from '../controllers/index.js';

const router = Router();

router.post('/', createUserController);

export default router;