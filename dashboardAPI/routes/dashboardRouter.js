import express from 'express';
import { getDashboard, getRanking } from '../controller/dashboardController.js';
var router = express.Router();

/* GET users listing. */
router.get('/', getDashboard);
router.get('/ranking', getRanking);
export default router;
