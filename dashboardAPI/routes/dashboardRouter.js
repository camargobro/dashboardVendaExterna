import express from 'express';
import { verDashboard, verRanking } from '../controller/dashboardController.js';

const router = express.Router();

router.get('/', verDashboard);
router.get('/ranking', verRanking);

export default router;
