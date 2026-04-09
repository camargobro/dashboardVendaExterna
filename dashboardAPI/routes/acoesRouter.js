import express from 'express';
import { buscarAcoes, criarAcoes } from '../controller/acoesController.js';
var router = express.Router();

/* GET users listing. */
router.get('/', buscarAcoes);
router.post('/', criarAcoes);
export default router;
