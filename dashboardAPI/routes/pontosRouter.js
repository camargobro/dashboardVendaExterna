import express from 'express';
import { criarPontos, buscarPontos, removerPonto } from '../controller/pontosController.js';
import { autenticar } from '../middlewares/autenticacaoUsuario.js'

var router = express.Router();

/* GET users listing. */
router.use(autenticar);

router.get('/', buscarPontos);
router.post('/', criarPontos);
router.delete('/:id', removerPonto);
export default router;
