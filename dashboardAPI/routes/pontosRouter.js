import express from 'express';
import { criarPontos, buscarPontos } from '../controller/pontosController.js';

var router = express.Router();

/* GET users listing. */
router.get('/', buscarPontos);
router.post('/', criarPontos);
export default router;
