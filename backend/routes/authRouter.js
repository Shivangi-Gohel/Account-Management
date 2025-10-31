import { Router } from 'express';
import { loginUser, registerUser, logoutUser, profile, updateUserProfile } from '../controllers/authController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.get("/profile", verifyJWT, profile);
router.post('/update', verifyJWT, updateUserProfile);


export default router;