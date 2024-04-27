import { Router } from 'express'
import { createUserController } from '../controllers/index.js';

const router = Router();

router.get('/', createUserController);

export default router;