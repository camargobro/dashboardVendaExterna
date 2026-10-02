import express from 'express';
import { buscarAcoes, criarAcoes, removerAcao } from '../controller/acoesController.js';
import { autenticar } from '../middlewares/autenticacaoUsuario.js'
var router = express.Router();

router.use(autenticar);

router.get('/', buscarAcoes);
router.post('/', criarAcoes);
router.delete('/:id', removerAcao);
export default router;
