import express from 'express';
import { buscarUsuarios, criarUsuario, apagarUsuario, login } from '../controller/usuariosController.js';
var router = express.Router();

router.get('/', buscarUsuarios);
router.post('/registrar', criarUsuario);
router.delete('/:id', apagarUsuario);
router.post('/login', login)
export default router;
