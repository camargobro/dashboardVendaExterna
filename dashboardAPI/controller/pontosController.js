import db from '../db.js';

import { mostrarPontos, criarPonto } from '../services/pontosServices.js';
export async function getPontos(req, res) {
    try{

        await res.status(200).json(mostrarPontos());
    }catch(error){
        console.error("Erro ao obter pontos:", error);
        res.status(500).json({ error: "Erro ao obter pontos" });
    }
}

export function postPontos(req, res) {
    try {
        const { nome, endereco, bairro, cidade, tipo } = req.body;

        // 🔒 validação de entrada
        if (!nome || !endereco || !bairro || !cidade || !tipo) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const novoPonto = criarPonto({ nome, endereco, bairro, cidade, tipo });

        return res.status(201).json(novoPonto);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}