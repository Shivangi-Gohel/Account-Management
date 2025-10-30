import { Router } from 'express';
import { loginUser, registerUser, logoutUser, getProfile, me } from '../controllers/authController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
// router.get('/profile', verifyJWT, getProfile);
router.get("/me", verifyJWT, me);


export default router;