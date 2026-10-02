import express from 'express';
import { verDashboard, verRanking, baixarRankingXlsx } from '../controller/dashboardController.js';
import { autenticar, somenteAdmin } from '../middlewares/autenticacaoUsuario.js';

const router = express.Router();

router.use(autenticar, somenteAdmin);

router.get('/', verDashboard);
router.get('/ranking', verRanking);
router.get('/ranking/xlsx', baixarRankingXlsx);

export default router;
