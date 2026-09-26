import express from 'express';
import { criarPontos, buscarPontos } from '../controller/pontosController.js';
import { autenticar } from '../middlewares/autenticacaoUsuario.js'

var router = express.Router();

/* GET users listing. */
router.get('/', autenticar, buscarPontos);
router.post('/', autenticar, criarPontos);
export default router;
