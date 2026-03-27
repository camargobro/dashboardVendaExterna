import { pontoDuplicado } from '../regrasNegocios/regrasNegociosPontos.js';

import db from "../db.js";

export function mostrarPontos() {
    return db;
}
export function criarPonto({ nome, endereco, bairro, cidade, tipo }) {

    if (pontoDuplicado({ nome, endereco })) {
        throw new Error("Ponto já existe");
    }

    const novoPonto = {
        _id: String(Date.now()),
        nome,
        endereco,
        bairro,
        cidade,
        tipo,
        ativo: true,
        createdAt: new Date()
    };

    db.push(novoPonto);

    return novoPonto;
}