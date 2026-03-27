import express from 'express';
import { getAcoes, postAcoes } from '../controller/acoesController.js';
var router = express.Router();

/* GET users listing. */
router.get('/', getAcoes);
router.post('/', postAcoes);
export default router;
