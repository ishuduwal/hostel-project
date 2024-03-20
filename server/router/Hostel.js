import express from 'express';
import { GetVerifiedHostel, GetHostel, GetUnverifiedHostel, DeleteHostel, ApproveHostel, FilterHostel } from '../controller/Hostel.js';
import { verifyToken } from '../Middleware/auth.js';

const router = express.Router();

router.get('/verified', GetVerifiedHostel);
router.post('/', verifyToken, GetHostel);
router.get('/unverified', verifyToken, GetUnverifiedHostel);
router.patch('/:id', verifyToken, ApproveHostel);
router.delete('/:_id', verifyToken, DeleteHostel);
router.post('/filter', verifyToken, FilterHostel)

export default router;