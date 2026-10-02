import express from 'express';
import { buscarUsuarios, criarUsuario, apagarUsuario, login } from '../controller/usuariosController.js';
import { autenticar, somenteAdmin } from '../middlewares/autenticacaoUsuario.js';
var router = express.Router();

router.get('/', autenticar, somenteAdmin, buscarUsuarios);
router.post('/registrar', criarUsuario);
router.delete('/:id', autenticar, somenteAdmin, apagarUsuario);
router.post('/login', login)
export default router;
