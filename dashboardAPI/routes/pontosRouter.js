import express from 'express';
import { getPontos, postPontos } from '../controller/pontosController.js';

var router = express.Router();

/* GET users listing. */
router.get('/', getPontos);
router.post('/', postPontos);
export default router;
