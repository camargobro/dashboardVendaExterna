import express from 'express';
import { criarPontos, buscarPontos } from '../controller/pontosController.js';
import { autenticar, somenteAdmin } from '../middlewares/autenticacaoUsuario.js'

var router = express.Router();

/* GET users listing. */
router.use(autenticar, somenteAdmin);

router.get('/', buscarPontos);
router.post('/', criarPontos);
export default router;
