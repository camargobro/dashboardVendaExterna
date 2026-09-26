import express from 'express';
import { buscarAcoes, criarAcoes, removerAcao } from '../controller/acoesController.js';
import { autenticar } from '../middlewares/autenticacaoUsuario.js'
var router = express.Router();

router.get('/', autenticar, buscarAcoes);
router.post('/', autenticar, criarAcoes);
router.delete('/:id', autenticar, removerAcao);
export default router;
