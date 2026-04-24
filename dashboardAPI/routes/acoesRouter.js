import express from 'express';
import { buscarAcoes, criarAcoes, removerAcao } from '../controller/acoesController.js';
var router = express.Router();

/* GET users listing. */
router.get('/', buscarAcoes);
router.post('/', criarAcoes);
router.delete('/:id', removerAcao);
export default router;
