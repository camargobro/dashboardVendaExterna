import express from 'express';
import { verDashboard, verRanking, baixarRankingXlsx } from '../controller/dashboardController.js';

const router = express.Router();

router.get('/', verDashboard);
router.get('/ranking', verRanking);
router.get('/ranking/xlsx', baixarRankingXlsx);

export default router;
