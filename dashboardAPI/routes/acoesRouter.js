import express from 'express';
import { buscarAcoes, criarAcoes, removerAcao } from '../controller/acoesController.js';
import { autenticar, somenteAdmin } from '../middlewares/autenticacaoUsuario.js'
var router = express.Router();

router.use(autenticar, somenteAdmin);

router.get('/', buscarAcoes);
router.post('/', criarAcoes);
router.delete('/:id', removerAcao);
export default router;
