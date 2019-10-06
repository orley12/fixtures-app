import { Router } from 'express';
import { adminSignup, adminSignin, userSignup, userSignin } from '../../controllers/auth.controller';
import { verifyAdmin, verifyUser, validateAuthData, verifyIsAdmin } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/admin-signup', validateAuthData, adminSignup);

router.post('/admin-signin', validateAuthData, verifyAdmin, verifyIsAdmin, adminSignin);

router.post('/signup', validateAuthData, userSignup);

router.post('/signin', validateAuthData, verifyUser, userSignin);

export default router;
