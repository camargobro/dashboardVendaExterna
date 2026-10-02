import express from 'express';
import { buscarUsuarios, criarUsuario, apagarUsuario, login } from '../controller/usuariosController.js';
import { autenticar } from '../middlewares/autenticacaoUsuario.js';
var router = express.Router();

router.get('/', autenticar, buscarUsuarios);
router.post('/registrar', criarUsuario);
router.delete('/:id', autenticar, apagarUsuario);
router.post('/login', login)
export default router;
